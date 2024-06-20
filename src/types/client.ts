import {Client as DClient, Collection} from "discord.js";

export class Client extends DClient {
    commands: Collection<any, any> = new Collection<any, any>();
}
