import {Client} from "./types/client";

require('dotenv')
    .config();
import {Collection, GatewayIntentBits} from 'discord.js';
import commands from './commands/commands';
import {events} from './events/events';
import deleteMessages from './workers/delete-messages';

const client: Client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

// Run each 60 seconds
setInterval(async () => await deleteMessages( client ), 60 * 1000);

client.commands = new Collection();

// Load commands as defined in commands.ts into a Collection for speed
for (const command of commands) {
    client.commands.set(command.data.name, command);
}

for (const event of events) {
    if (event.once) {
        client.once(event.name, (...args) => {
            try {
                return event.execute(...args)
            } catch (e) {
                console.warn(`Caught exception while handling ${event.name}: ${e}`);
            }
        });
    } else {
        client.on(event.name, (...args) => {
            try {
                return event.execute(...args)
            } catch (e) {
                console.warn(`Caught exception while handling ${event.name}: ${e}`);
            }
        });
    }
}

client.login(process.env.DISCORDJS_BOT_TOKEN);
