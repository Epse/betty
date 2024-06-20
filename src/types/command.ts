import {
    ChatInputCommandInteraction,
    SharedSlashCommand, SlashCommandSubcommandBuilder
} from "discord.js";
import {Authorization} from "../authorization/authorize";

export interface Command {
    authorizedFor: Authorization,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>,
    data: SharedSlashCommand,
}

export interface SubCommand {
    make(command: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>,
    name: string,
}
