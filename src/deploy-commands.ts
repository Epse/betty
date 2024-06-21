import {REST, RESTPostAPIApplicationCommandsJSONBody, Routes} from "discord.js";

require('dotenv').config();

import commands from "./commands/commands";
import {contextMenuHandlers} from "./context_menu/context_menu";


const token = process.env.DISCORDJS_BOT_TOKEN;
const clientId = process.env.DISCORD_APP_ID;

let jsonCommands : RESTPostAPIApplicationCommandsJSONBody[] = commands.map(x => x.data.toJSON());
jsonCommands = jsonCommands.concat(contextMenuHandlers.map(x => x.data.toJSON()));

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${jsonCommands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: jsonCommands },
        );

        const count: string = (typeof data == 'object' && 'length' in data) ? data.length.toString() : 'unknown number of';

        console.log(`Successfully reloaded ${count} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
