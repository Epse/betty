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
    ChatInputCommandInteraction,
    SlashCommandBuilder,
} from "discord.js";
import {getRunwayConfig} from "./runway_config";
import {airportOption, pseudoPilotOption} from "./common_options";


// TODO is authz necessary?
export default {
    authorizedFor: new PublicAuthorization(),
    data: new SlashCommandBuilder()
        .setName('scenario')
        .setDMPermission(true)
        .setDescription('Build scenario file for training.')
        .addSubcommand(command =>
            command
                .setName('low')
                .setDescription('Low intensity scenario')
                .addStringOption(option => airportOption(option))
                .addStringOption(option => pseudoPilotOption(option))
        )
        .addSubcommand(command =>
            command
                .setName('medium')
                .setDescription('Medium intensity scenario')
                .addStringOption(option => airportOption(option))
                .addStringOption(option => pseudoPilotOption(option))
        )
        .addSubcommand(command =>
            command
                .setName('high')
                .setDescription('High intensity scenario')
                .addStringOption(option => airportOption(option))
                .addStringOption(option => pseudoPilotOption(option))
        )
        .addSubcommand(command =>
            command
                .setName('vfr')
                .setDescription('VFR scenario')
                .addStringOption(option => airportOption(option))
                .addStringOption(option => pseudoPilotOption(option))
                .addIntegerOption(option =>
                    option.setName('vfr_dep')
                        .setDescription('Amount of VFR Departures')
                        .setMinValue(0)
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('vfr_arr')
                        .setDescription('Amount of VFR Arrivals')
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
        .addSubcommand(command =>
            command
                .setName('custom')
                .setDescription('Custom scenario')
                .addStringOption(option => airportOption(option))
                .addStringOption(option => pseudoPilotOption(option))
                .addIntegerOption(option =>
                    option.setName('start_spawns')
                        .setDescription('Start spawns')
                        .setMinValue(0)
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('ifr_dep')
                        .setDescription('Amount of IFR Departures')
                        .setMinValue(0)
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('ifr_arr')
                        .setDescription('Amount of IFR Arrivals')
                        .setMinValue(0)
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('vfr_dep')
                        .setDescription('Amount of VFR Departures')
                        .setMinValue(0)
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('vfr_arr')
                        .setDescription('Amount of VFR Arrivals')
                        .setMinValue(0)
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName('faults')
                        .setDescription('Faults')
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
    ,
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        // We will be assuming the Discord input validation actually works...
        const airport = interaction.options.getString('airport');
        await interaction.reply({
            ephemeral: true,
            content: "👷‍♀️ We're still building this! 🚧"
        });

        // TODO: handle timeouts
        const runwayConfig = await getRunwayConfig(airport, interaction);

        return;
    }
} satisfies Command;
