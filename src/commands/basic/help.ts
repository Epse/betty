import {Command} from "../../types/command";

import {SlashCommandBuilder} from "discord.js";

require('dotenv').config();


export default {
    data: new SlashCommandBuilder()
        .setName(process.env.NAME.toLowerCase())
        .setDescription(`Explain ${process.env.NAME} functionality.`),
    async execute(interaction) {
        await interaction.reply({
            ephemeral: true,
            content: `
${process.env.NAME} helps you with vACC tasks!
Right now, you can use:
- \`/loa\` to announce a LOA
- \`/${process.env.NAME.toLowerCase()}\` to view this help
- \`/atis\` to view an ATIS

Type a command to view in-line documentation on its arguments and usage.

This bot is open source and licensed under GPL3.0.
For more info, see [GitHub](https://github.com/Epse/betty) .
`
        });
    },
    authorizedFor: '',
} satisfies Command;
