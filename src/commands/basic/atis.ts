import {Command} from "../../types/command";
import {ChatInputCommandInteraction, CommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {PublicAuthorization} from "../../authorization/authorize";

function buildEmbed(atis: any): EmbedBuilder {
    return new EmbedBuilder()
        .setColor(0x289fb8)
        .setTitle(`${atis['callsign']} is online!`)
        .setDescription(atis['text_atis'].join('\n'))
        .addFields(
            {name: 'Frequency', value: atis['frequency'], inline: true},
            {name: 'Code', value: atis['atis_code'], inline: true},
            {name: 'Last update', value: atis['last_updated'], inline: true},
        )
}

async function replyATIS(interaction: ChatInputCommandInteraction): Promise<boolean> {
    const icao = interaction.options.getString('icao').toUpperCase();
    const callsign = icao + '_ATIS';

    const response = await fetch('https://data.vatsim.net/v3/vatsim-data.json');
    if (!response.ok) {
        await interaction.reply({
            ephemeral: true,
            content: "☹ the VATSIM ATIS system isn't working right now, sorry...",
        });
        return false;
    }
    const atises = (await response.json())['atis'];
    for (const atis of atises) {
        if (atis['callsign'] !== callsign) {
            continue;
        }

        await interaction.reply({
            embeds: [buildEmbed(atis)]
        });
        return true;
    }

    return false;
}

async function replyMETAR(interaction: ChatInputCommandInteraction): Promise<boolean> {
    const icao = interaction.options.getString('icao').toUpperCase();

    const response = await fetch('https://metar.vatsim.net/' + icao);
    if (!response.ok) {
        await interaction.reply({
            ephemeral: true,
            content: '☹ Could not get a METAR for the specified station, sorry'
        });
        return false;
    }

    const metar = await response.text();
    if (metar.length == 0) {
        await interaction.reply({
            ephemeral: true,
            content: 'No METAR found for that station, are you sure it exists?'
        });
        return false;
    }

    await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setColor(0x289fb8)
                .setTitle(`No ATIS for ${icao}`)
                .setDescription(`
*But here is the latest METAR*

${metar} `)
        ]
    });

    return true;
}

export default {
    authorizedFor: new PublicAuthorization(),
    data: new SlashCommandBuilder()
        .setName('atis')
        .setDescription('Fetch specified ATIS or METAR from VATSIM')
        .addStringOption(option =>
            option.setName('icao')
                .setRequired(true)
                .setDescription('ICAO code of an airport')
                .setMinLength(4)
                .setMaxLength(4)
        ),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        if (await replyATIS(interaction)) {
            return;
        }

        // Okay, no matching ATIS. It's METAR time
        await replyMETAR(interaction);
    }
} satisfies Command;
