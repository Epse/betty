import {SubCommand} from "../../types/command";
import {ChannelType, EmbedBuilder, GuildMember, SlashCommandSubcommandBuilder} from "discord.js";
import {ThreadAutoArchiveDuration} from 'discord-api-types/v10';
import * as Config from '../../../config.json';

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
        const channel = await interaction.client.channels.fetch(Config.events.announcement_channel_id);
        const title = interaction.options.getString('title');

        if (channel === null || channel.type !== ChannelType.GuildText) {
            await interaction.reply({
                ephemeral: true,
                content: 'Specified channel is not supported, sorry'
            });
            return;
        }

        const startMessage = await channel.send({
            embeds: [new EmbedBuilder()
                .setTitle(title)
                .setColor(0x289fb8)]
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
                    .setColor(0x289fb8)
            ]
        });
        if (interaction.member instanceof GuildMember) {
            await thread.members.add(interaction.member)
        }

        await interaction.reply({
            ephemeral: true,
            content: `Message posted: https://discord.com/channels/${startMessage.guildId}/${startMessage.channelId}/${startMessage.id}`
        });
    }
} satisfies SubCommand
