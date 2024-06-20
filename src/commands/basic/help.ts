import {Command} from "../../types/command";

import {SlashCommandBuilder} from "discord.js";

require('dotenv').config();


new SlashCommandBuilder()
    .setName('help')
    .setDescription(`Explain ${process.env.NAME} functionality.`);

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(`Explain ${process.env.NAME} functionality.`),
    async execute(interaction) {
        await interaction.reply({
            ephemeral: true,
            content: `
${process.env.NAME} helps you with vACC tasks!
Right now, you can use:
- \`/loa\` to announce a LOA
- \`/help\` to view this help

Type a command to view in-line documentation on its arguments and usage.
`
        });
    },
    authorizedFor: '',
} as Command;
