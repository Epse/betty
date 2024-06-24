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
- \`/license\` for info on, well, licensing

Type a command to view in-line documentation on its arguments and usage.

\`/atis\` is available in DMs.
You may not have permission to run some or most commands.
`
        });
    },
    authorizedFor: new PublicAuthorization(),
} satisfies Command;
