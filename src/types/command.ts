import {
    ChatInputCommandInteraction,
    SharedSlashCommand
} from "discord.js";

export interface Command {
    authorizedFor: string,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>,
    data: SharedSlashCommand,
}
