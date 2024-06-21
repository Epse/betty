import {Command} from "../../types/command";

import {SlashCommandBuilder} from "discord.js";
import {PublicAuthorization} from "../../authorization/authorize";
import config from '../../util/config';

require('dotenv').config();


export default {
    data: new SlashCommandBuilder()
        .setName(config.name.toLowerCase())
        .setDescription(`Explain ${config.name} functionality.`),
    async execute(interaction) {
        await interaction.reply({
            ephemeral: true,
            content: `
${config.name} helps you with vACC tasks!
Right now, you can use:
- \`/loa\` to announce a LOA
- \`/${config.name.toLowerCase()}\` to view this help
- \`/atis\` to view an ATIS
- \`/event\` to publish an event

Type a command to view in-line documentation on its arguments and usage.

This bot is open source and licensed under GPL3.0.
For more info, see [GitHub](https://github.com/Epse/betty) .
`
        });
    },
    authorizedFor: new PublicAuthorization(),
} satisfies Command;
