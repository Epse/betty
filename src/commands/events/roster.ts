import {SubCommand} from "../../types/command";
import {ChannelType, ChatInputCommandInteraction, SlashCommandSubcommandBuilder, ThreadChannel} from "discord.js";

export default {
    name: 'roster',
    make: (command: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder =>
        command
            .setName('roster')
            .setDescription('Post the roster')
            .addChannelOption(option =>
                option.setName('thread')
                    .setDescription('Thread to post in')
                    .setRequired(true)
                    .addChannelTypes(ChannelType.PrivateThread, ChannelType.PublicThread)
            )
            .addAttachmentOption(option =>
                option.setName('roster_file')
                    .setDescription('Roster file')
                    .setRequired(true)
            )
    ,
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const file = interaction.options.getAttachment('roster_file');
        const thread = interaction.options.getChannel('thread');

        if (!(thread instanceof ThreadChannel)) {
            await interaction.reply({
                ephemeral: true,
                content: 'Bad channel type, sorry'
            });
            return;
        }

        const rosterMessage = await thread.send(file.url);
        await thread.send('@everyone The roster has been posted!');
        await rosterMessage.pin();
        await thread.setName(thread.name.replace('BOOKING', 'PLANNING'));
        await interaction.reply({
            ephemeral: true,
            content: 'Okie dokie!'
        });
    }
} satisfies SubCommand;
