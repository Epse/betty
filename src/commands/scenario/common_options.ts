import {SlashCommandStringOption} from "discord.js";

export const supported_icao = ['EBBR', 'EBAW', 'EBOS', 'EBCI', 'EBLG', 'ELLX'];

export function airportOption(option: SlashCommandStringOption): SlashCommandStringOption {
    return option
        .setName('airport')
        .setDescription('ICAO code for the airport')
        .setRequired(true)
        .setMinLength(4)
        .setMaxLength(4)
        .setChoices(supported_icao.map(x => ({name: x, value: x})));
}

export function pseudoPilotOption(option: SlashCommandStringOption): SlashCommandStringOption {
    return option
        .setName('pseudo_pilot')
        .setDescription('Pseudo Pilot station')
        .setRequired(true)
        .setChoices(
            ["EBBR_TWR", "EBBR_APP", "ELLX_APP", "EBLG_APP", "EBOS_APP", "EBBU_CTR"]
                .map(x => ({name: x, value: x}))
        );
}
