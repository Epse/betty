import {Client, Collection} from "discord.js";
import {Command} from "./command";

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, Command>;
        cache: Map<string, any>;
    }
}

Client.prototype.commands = new Collection<string, Command>();
Client.prototype.cache = new Map<string, any>();
