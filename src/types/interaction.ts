import {ChatInputCommandInteraction, MessageComponentInteraction} from "discord.js";

export type ReplyableInteraction =
    | MessageComponentInteraction
    | ChatInputCommandInteraction
;
