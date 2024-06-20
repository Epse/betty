import {ChatInputCommandInteraction, Events, GuildMember, Interaction} from "discord.js";
import {EventHandler} from "../events";
import {Client} from "../../types/client";


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

        let member = interaction.member;
        if (!(member instanceof GuildMember)) {
            member = await interaction.guild.members.fetch(member.user.id);
        }
        if (!member) {
            return; // Just ignore that, shouldn't be possible anyway
        }

        if (!command.authorizedFor.allowed(member)) {
            await interaction.reply({
                ephemeral: true,
                content: "☹ sorry, I can't let you do that..."
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
