import {Client, Collection} from "discord.js";
import {Command} from "./command";

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, Command>;
        cache: Map<string, any>;
    }
}

declare global {
    module NodeJS {
        interface Global {
            cache: Map<string, any>;
        }
    }
}

if (global.cache === undefined || global.cache === null) {
    global.cache = new Map<string, any>();
    Client.prototype.cache = global.cache;
}
Client.prototype.commands = new Collection<string, Command>();
