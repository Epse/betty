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

        const interactionId = 'runway_config-' + interactionIdSuffix(interaction);
        const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
            .addComponents(new StringSelectMenuBuilder()
                .setCustomId(interactionId)
                .setPlaceholder('Please choose one')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Dep: 25R Arr: 25L')
                        .setValue('d:25r_a:25l'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Dep: 25R Arr: 19')
                        .setValue('d:25r_a:19'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Dep: 07L Arr: 07R')
                        .setValue('d:07l_a:07r'),
                ));

        const m = await interaction.reply({
            content: 'Choose your runway configuration',
            components: [row]
        });

        const runway = await m.awaitMessageComponent({
            filter: x => x.customId === interactionId,
            time: 60_000
        }) as StringSelectMenuInteraction;
        await runway.reply({
            ephemeral: true,
            content: `
We got:
- Runway config: ${runway.values[0]}
- Airport: ${interaction.options.getString('airport')}
- Intensity: ${interaction.options.getString('intensity')}
- Pseudo-pilot: ${interaction.options.getString('pseudo_pilot')}
            `
        });

        if (interaction.options.getString('intensity') === 'VFR') {
            const vfrIntensity = await getVfrIntensity(runway);
            await runway.followUp({
                ephemeral: true,
                content: `We also got VFR departures: ${vfrIntensity.departures} and arrivals: ${vfrIntensity.arrivals}`
            });
        }

        await runway.followUp({
            ephemeral: true,
            content: "👷‍♀️ We're still building this! 🚧"
        });
        return;
    }
} satisfies Command;
