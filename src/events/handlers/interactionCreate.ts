import {
    ApplicationCommandType,
    ChatInputCommandInteraction, Client,
    CommandInteraction,
    ContextMenuCommandInteraction,
    Events,
    GuildMember,
    Interaction
} from "discord.js";
import {EventHandler} from "../events";
import "../../types/client";
import {AuthorizationType} from "../../authorization/authorize";
import {Command} from "../../types/command";
import {ContextMenu, contextMenuHandlers} from "../../context_menu/context_menu";

async function isAuthorized(interaction: CommandInteraction, command: Command | ContextMenu): Promise<boolean> {
    // For weird TS reasons, we can't use inGuild, becaused that's typed to always be true...
    if (!interaction.guildId) {
        return command.authorizedFor.type === AuthorizationType.Public;
    }

    let member = interaction.member;
    if (!(member instanceof GuildMember)) {
        member = await interaction.guild.members.fetch(member.user.id);
    }
    if (!member) {
        return false; // Just ignore that, shouldn't be possible anyway
    }

    return command.authorizedFor.allowed(member);

}

async function doChatInputCommand(interaction: ChatInputCommandInteraction): Promise<void> {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    if (!await isAuthorized(interaction, command)) {
        await interaction.reply({
            ephemeral: true,
            content: '👮 No can do. Sorry not sorry!'
        });
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
        } else {
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
}

async function doContextMenu(interaction: ContextMenuCommandInteraction): Promise<void> {
    const menu = contextMenuHandlers.get(interaction.commandName);

    if (!menu) {
        console.error(`No Context Menu matching ${interaction.commandName}`);
        return
    }

    if (!await isAuthorized(interaction, menu)) {
        await interaction.reply({
            ephemeral: true,
            content: '👮 No can do. Sorry not sorry!'
        });
        return;
    }

    if (interaction.isUserContextMenuCommand() !== (menu.data.type === ApplicationCommandType.User)) {
        console.error(`Got the wrong kind of context interaction for command ${interaction.commandName}`);
        return;
    }

    try {
        await menu.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
        } else {
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
}

export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: Interaction) {
        if (interaction.isChatInputCommand()) {
            return await doChatInputCommand(interaction as ChatInputCommandInteraction);
        }

        if (interaction.isContextMenuCommand()) {
            return await doContextMenu(interaction as ContextMenuCommandInteraction);
        }
    },
} as EventHandler;
