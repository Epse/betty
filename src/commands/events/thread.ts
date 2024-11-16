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
    ,
    execute: async interaction => {
        const channel = await interaction.client.channels.fetch(config.events.announcement_channel_id);
        const title = interaction.options.getString('title');

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
            name: `[BOOKING] - ${title}`,
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
        for (const roleId of config.events.add_roles) {
            const role = await interaction.guild.roles.fetch(roleId);
                role.members.each(async member => await thread.members.add(member))
        }

        await interaction.followUp({
            ephemeral: true,
            content: `Message posted: https://discord.com/channels/${startMessage.guildId}/${startMessage.channelId}/${startMessage.id}`
        });
    }
} satisfies SubCommand
