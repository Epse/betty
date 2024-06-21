import {
    ApplicationCommandType,
    ContextMenuCommandBuilder,
    ContextMenuCommandInteraction, GuildMember, UserContextMenuCommandInteraction
} from "discord.js";
import {ContextMenu} from "./context_menu";
import {PublicAuthorization} from "../authorization/authorize";

const data = new ContextMenuCommandBuilder()
    .setName('View on My Belux')
    .setType(ApplicationCommandType.User)
    .setDMPermission(false);

async function execute(_interaction: ContextMenuCommandInteraction): Promise<void> {
    if (!(_interaction instanceof UserContextMenuCommandInteraction)) {
        return;
    }
    const interaction = _interaction as UserContextMenuCommandInteraction;
    const parts = ((interaction.targetMember as GuildMember).nickname).split(' - ');
    if (parts.length !== 2) {
        await interaction.reply({
            ephemeral: true,
            content: 'User does not appear to have a CID in their nick, sorry'
        });
        return;
    }

    const cid = parts[1];

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
