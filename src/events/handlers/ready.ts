import {Client} from '../../types/client';

import {Events} from 'discord.js';
import {EventHandler} from "../events";
import {liveStats} from "../../workers/live-stats";

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client: Client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        await liveStats(client);
    },
} as EventHandler;
