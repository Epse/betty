import {Collection, ContextMenuCommandBuilder, ContextMenuCommandInteraction} from "discord.js";
import stats from "./stats";
import {Authorization} from "../authorization/authorize";
import view_my from "./view_my";

export interface ContextMenu {
    authorizedFor: Authorization,
    data: ContextMenuCommandBuilder,
    execute: (interaction: ContextMenuCommandInteraction) => Promise<void>,
}

export const contextMenuHandlers = new Collection<string, ContextMenu>(
    [
        stats,
        view_my,
    ].map(x => [x.data.name, x])
);
