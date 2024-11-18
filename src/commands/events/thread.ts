import {SubCommand} from "../../types/command";
import {ChannelType, EmbedBuilder, GuildMember, SlashCommandSubcommandBuilder} from "discord.js";
import {ThreadAutoArchiveDuration} from 'discord-api-types/v10';
import config from '../../util/config';

export default {
    name: 'thread',
    make: (command: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder =>
        command
            .setName('thread')
            .setDescription('Create thread and announce to controllers')
            .addStringOption(option =>
                option.setName('title')
                    .setDescription('Title for the thread')
                    .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('kind')
                    .setChoices([
                        {name: 'BOOKING', value: 'BOOKING'},
                        {name: 'CPT', value: 'CPT'},
                        {name: 'REQUEST', value: 'REQUEST'},
                    ])
                    .setDescription('Kind of event')
                    .setRequired(false)
            )
    ,
    execute: async interaction => {
        const channel = await interaction.client.channels.fetch(config.events.announcement_channel_id);
        const title = interaction.options.getString('title');
        const kind = interaction.options.getString('kind') ?? 'BOOKING';

        if (channel === null || channel.type !== ChannelType.GuildText) {
            await interaction.reply({
                ephemeral: true,
                content: 'Specified channel is not supported, sorry'
            });
            return;
        }
        await interaction.deferReply({ephemeral: true})

        const startMessage = await channel.send({
            embeds: [new EmbedBuilder()
                .setTitle(title)
                .setColor(config.color)]
        });

        const thread = await startMessage.startThread({
            name: `[${kind}] - ${title}`,
            autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
        });
        await thread.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle('**Register now!**')
                    .setDescription('Use this thread to post your availability. No chatting! 👀')
                    .setColor(config.color)
            ]
        });
        if (interaction.member instanceof GuildMember) {
            await thread.members.add(interaction.member)
        }
        // This is stupid, but somehow makes it work... Slowly and needing the GuildMember intent
        await interaction.guild.members.fetch();
        for (const roleId of config.events.add_roles) {
            const role = await interaction.guild.roles.fetch(roleId);
            for (const [_, member] of role.members) {
                await thread.members.add(member);
            }
        }

        await interaction.followUp({
            ephemeral: true,
            content: `Message posted: https://discord.com/channels/${startMessage.guildId}/${startMessage.channelId}/${startMessage.id}`
        });
    }
} satisfies SubCommand
