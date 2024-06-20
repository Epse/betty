import {SubCommand} from "../../types/command";
import {ChannelType, ChatInputCommandInteraction, ThreadChannel} from "discord.js";

export default {
    name: 'activate',
    make: (command) =>
        command.setName('activate')
            .setDescription('Activate an event')
            .addChannelOption(option =>
                option.setName('thread')
                    .setDescription('Thread to activate')
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
        await thread.setName(thread.name.replace(re, '[ACTIVE]'));
        await interaction.reply({
            ephemeral: true,
            content: "Good luck 🛫"
        });
    }
} satisfies SubCommand;
