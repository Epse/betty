/*
Data to collect for scenario generator:
- Airport
- Intensity: [low, medium, high, vfr, custom]
  - if VFR: amount of departures and arrivals
  - if custom: start spawns, departures, arrivals, vfr deps, vfr arrivals, faults, (might skip)
- Runway configuration (appropriate to airport)
- Pseudo Pilot (select one from list pseudoList = ["EBBR_TWR","EBBR_APP","ELLX_APP","EBLG_APP","EBOS_APP","EBBU_CTR"] )

This gets fed into the script.
 */

import {Command} from "../../../types/command";
import {PublicAuthorization} from "../../../authorization/authorize";
import {
    ActionRowBuilder, BaseInteraction,
    ChatInputCommandInteraction, Interaction,
    MessageActionRowComponentBuilder, MessageComponentInteraction,
    SlashCommandBuilder,
    StringSelectMenuBuilder, StringSelectMenuInteraction,
    StringSelectMenuOptionBuilder
} from "discord.js";
import {interactionIdSuffix} from "../../../util/interaction";
import {getVfrIntensity} from "./vfr_intensity";
import {getRunwayConfig} from "./runway_config";

// TODO: handle timeouts
const supported_icao = ['EBBR', 'EBAW', 'EBOS', 'EBCI', 'EBLG', 'ELLX'];

// TODO is authz necessary?
export default {
    authorizedFor: new PublicAuthorization(),
    data: new SlashCommandBuilder()
        .setName('scenario')
        .setDMPermission(true)
        .setDescription('Build scenario file for training.')
        .addStringOption(option =>
            option
                .setName('airport')
                .setDescription('ICAO code for the airport')
                .setRequired(true)
                .setMinLength(4)
                .setMaxLength(4)
                .setChoices(supported_icao.map(x => ({name: x, value: x})))
        )
        .addStringOption(option =>
            option
                .setName('intensity')
                .setDescription('Intensity')
                .setRequired(true)
                .setChoices(
                    ['Low', 'Medium', 'High', 'VFR', 'Custom'].map(x => ({name: x, value: x}))
                )
        )
        .addStringOption(option =>
            option
                .setName('pseudo_pilot')
                .setDescription('Pseudo Pilot station')
                .setRequired(true)
                .setChoices(
                    ["EBBR_TWR", "EBBR_APP", "ELLX_APP", "EBLG_APP", "EBOS_APP", "EBBU_CTR"]
                        .map(x => ({name: x, value: x}))
                )
        )
    ,
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        await interaction.reply({
            ephemeral: true,
            content: "Okay, I have some questions for you!"
        });

        const runwayConfig = await getRunwayConfig(interaction.options.getString('airport'), interaction);
        await interaction.followUp({
            ephemeral: true,
            content: `
We got:
- Airport: ${interaction.options.getString('airport')}
- Runway config: ${runwayConfig}
- Intensity: ${interaction.options.getString('intensity')}
- Pseudo-pilot: ${interaction.options.getString('pseudo_pilot')}
            `
        });

        if (interaction.options.getString('intensity') === 'VFR') {
            const vfrIntensity = await getVfrIntensity(interaction);
            await interaction.followUp({
                ephemeral: true,
                content: `We also got VFR departures: ${vfrIntensity.departures} and arrivals: ${vfrIntensity.arrivals}`
            });
        }

        await interaction.followUp({
            ephemeral: true,
            content: "👷‍♀️ We're still building this! 🚧"
        });
        return;
    }
} satisfies Command;
