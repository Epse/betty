import {SubCommand} from "../../types/command";
import {ChannelType, ChatInputCommandInteraction, ThreadChannel} from "discord.js";

export default {
    name: 'debrief',
    make: (command) =>
        command.setName('debrief')
            .setDescription('Debrief an event')
            .addChannelOption(option =>
                option.setName('thread')
                    .setDescription('Thread to debrief')
                    .addChannelTypes(ChannelType.PublicThread, ChannelType.PrivateThread)
                    .setRequired(true)
            )
    ,
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const thread = interaction.options.getChannel('thread');
        if (!(thread instanceof ThreadChannel)) {
            await interaction.reply({
                ephemeral: true,
                content: 'Bad channel type, sorry'
            });
            return;
        }

        const re = /\[\w+]/i
        await thread.setName(thread.name.replace(re, '[DEBRIEF]'));
        await interaction.reply({
            ephemeral: true,
            content: "🛬 okay"
        });
    }
} satisfies SubCommand;
