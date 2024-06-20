import {Client} from '../../types/client';

import {Events} from 'discord.js';
import {EventHandler} from "../events";

export default {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
} as EventHandler;
