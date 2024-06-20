import {ClientEvents} from "discord.js";
import ready from './handlers/ready';
import interactionCreate from './handlers/interactionCreate';

export interface EventHandler {
    name: keyof ClientEvents, // Odd type, I know
    once: boolean,
    execute: (...args: any[]) => Promise<void>,
}

const events: EventHandler[] = [
    ready,
    interactionCreate,
];

export { events };
