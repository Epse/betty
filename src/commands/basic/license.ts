import {Command} from "../../types/command";
import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {PublicAuthorization} from "../../authorization/authorize";

export default {
    data: new SlashCommandBuilder()
        .setName('license')
        .setDescription('Give License information for this bot'),
    authorizedFor: new PublicAuthorization(),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.reply({
            ephemeral: true,
            content: `
This bot is open source and licensed under the GNU GPL v3.0.
Copyright information, full license text and code is available on GitHub or on request.
            `
        });
    }
} satisfies Command
