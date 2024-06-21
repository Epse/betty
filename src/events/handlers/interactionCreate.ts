import {ChatInputCommandInteraction, Events, GuildMember, Interaction} from "discord.js";
import {EventHandler} from "../events";
import {Client} from "../../types/client";
import {AuthorizationType} from "../../authorization/authorize";
import {Command} from "../../types/command";

async function isAuthorized(interaction: ChatInputCommandInteraction, command: Command): Promise<boolean> {
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

export default {
    name: Events.InteractionCreate,
    once: false,
    async execute(_interaction: Interaction) {
        if (!_interaction.isChatInputCommand()) return;
        const interaction: ChatInputCommandInteraction = _interaction as ChatInputCommandInteraction;

        const command = (interaction.client as Client).commands.get(interaction.commandName);

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
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
} as EventHandler;
