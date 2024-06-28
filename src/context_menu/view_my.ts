import {
    ApplicationCommandType,
    ContextMenuCommandBuilder,
    ContextMenuCommandInteraction,
    UserContextMenuCommandInteraction
} from "discord.js";
import {ContextMenu} from "./context_menu";
import {PublicAuthorization} from "../authorization/authorize";
import {cidFromDiscord} from "../util/cid_from_discord";

const data = new ContextMenuCommandBuilder()
    .setName('View on My Belux')
    .setType(ApplicationCommandType.User)
;

async function execute(interaction: ContextMenuCommandInteraction): Promise<void> {
    if (!(interaction instanceof UserContextMenuCommandInteraction)) {
        return;
    }
    const cid = await cidFromDiscord(interaction.targetUser.id);
    if (cid === undefined) {
        await interaction.reply({
            ephemeral: true,
            content: "User does not have an associated CID through VATSIM, sorry 😞"
        });
        return;
    }

    await interaction.reply({
        ephemeral: true,
        content: `[View on My Belux](https://my.beluxvacc.org/members/${cid})`
    });
}

export default {
    execute: execute,
    authorizedFor: new PublicAuthorization(),
    data: data,
} satisfies ContextMenu
