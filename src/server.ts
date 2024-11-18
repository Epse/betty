import "./types/cache";

require('dotenv')
    .config();
import {Client, Collection, GatewayIntentBits} from 'discord.js';
import commands from './commands/commands';
import {events} from './events/events';
import deleteMessages from './workers/delete-messages';
import {liveStats} from "./workers/live-stats";

const client: Client = new Client({
    intents: [
        // Needed for pretty much everything
        GatewayIntentBits.Guilds,
        // Used by the automatic voice channel moving, especially closing empty channels
        GatewayIntentBits.GuildVoiceStates,
        // Used to get members of a role
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();

// Load commands as defined in commands.ts into a Collection for speed
for (const command of commands) {
    client.commands.set(command.data.name, command);
}

for (const event of events) {
    if (event.once) {
        client.once(event.name, async (...args) => {
            try {
                return await event.execute(...args)
            } catch (e) {
                console.warn(`Caught exception while handling ${event.name}: ${e}`);
                console.debug(e);
            }
        });
    } else {
        client.on(event.name, async (...args) => {
            try {
                return await event.execute(...args)
            } catch (e) {
                console.warn(`Caught exception while handling ${event.name}: ${e}`);
                console.debug(e);
            }
        });
    }
}

client.login(process.env.DISCORDJS_BOT_TOKEN);

// Run each 60 seconds
setInterval(async () => {
    try {
        await deleteMessages(client);
    } catch (e) {
        console.warn(`Got exception when running deleteMessages handler: ${e}`);
    }
}, 60 * 1000);

setInterval(async () => {
    try {
        await liveStats(client);
    } catch (e) {
        console.warn(`Got exception when running liveStats handler: ${e}`);
    }
}, 15 * 60 * 1000); // 15 minutes, roughly the vatsim datafile refresh

