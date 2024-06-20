import {
    ChatInputCommandInteraction,
    SharedSlashCommand
} from "discord.js";
import {Authorization} from "../authorization/authorize";

export interface Command {
    authorizedFor: Authorization,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>,
    data: SharedSlashCommand,
}
