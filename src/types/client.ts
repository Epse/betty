import {Client as DClient, Collection} from "discord.js";
import {Command} from "./command";

export class Client extends DClient {
    commands: Collection<string, Command> = new Collection<string, Command>();
}
