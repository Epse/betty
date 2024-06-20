import {MessageComponentInteraction, SlashCommandBuilder} from "discord.js";

export interface Command {
    authorizedFor: string,
    execute: (interaction: MessageComponentInteraction) => Promise<void>,
    data: SlashCommandBuilder,
}
