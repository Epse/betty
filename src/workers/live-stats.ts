import "../types/cache";
import {APIEmbedField, BaseGuildTextChannel, Client, EmbedBuilder} from "discord.js";
import {makeTimestamp, TimestampFormat} from "../util/timestamp";
import config from "../util/config";

function aggregateAirport(icao: string, data: any): APIEmbedField[] {
    const flightPlans = data['pilots'].filter(x => x['flight_plan'] != null).map(x => x['flight_plan']);
    const arrivals = flightPlans.filter(x => x['arrival'] === icao).length;
    const departures = flightPlans.filter(x => x['departure'] === icao).length;

    if (arrivals + departures == 0) {
        return [];
    }

    return [
        {
            name: ' ',
            value: icao,
            inline: true
        },
        {
            name: '🛫',
            value: departures.toString(),
            inline: true
        },
        {
            name: '🛬',
            value: arrivals.toString(),
            inline: true
        }
    ];
}

function prefixMatches(callsign: string): boolean {
    const prefix = callsign.split('_')[0];
    return config.activity.airports.findIndex(x => x === prefix) !== -1
        || config.activity.additional_prefixes.findIndex(x => callsign.startsWith(x)) !== -1;
}

function getControllerFields(data: any): APIEmbedField[] {
    return data['controllers']
        .filter(x => prefixMatches(x['callsign']))
        .filter(controller => controller['frequency'] !== '199.998')
        .map(controller => ({
                name: `🟢 ${controller['callsign']}`,
                value: `${controller['frequency']} | [${controller['name']}](https://stats.vatsim.net/stats/${controller['cid']}) since ${makeTimestamp(controller['logon_time'], TimestampFormat.Relative)}`,
                inline: false
        }));
}

function getAtisFields(data: any): APIEmbedField[] {
    return data['atis']
        .filter(atis => prefixMatches(atis['callsign']))
        .map(atis => {
            const atis_code = atis['atis_code'];
            if (!atis_code) {
                return {
                    name: `:question: ${atis['callsign']}`,
                    value: atis['frequency'],
                    inline: false,
                };
            }

            const atis_letter = atis_code.toLowerCase();
            return {
                name: `:regional_indicator_${atis_letter}: ${atis['callsign']}`,
                value: atis['frequency'],
                inline: false
            };
        });
}

export async function liveStats(client: Client): Promise<void> {
    if (config.activity.channel_id.length === 0)
        return;

    const channel = await client.channels.fetch(config.activity.channel_id);
    if (channel === null) {
        console.warn("Live stat channel not found.");
        return;
    }
    if (!(channel instanceof BaseGuildTextChannel)) {
        console.warn("Live stat channel not a text channel");
        return;
    }

    const response = await fetch('https://data.vatsim.net/v3/vatsim-data.json');
    if (!response.ok) {
        console.warn(`Got code ${response.status} from VATSIM datafile`);
        return;
    }
    const datafile = await response.json();
    const relatime = makeTimestamp(datafile['general']['update_timestamp'], TimestampFormat.Relative)

    const airportFields = config.activity.airports
        .flatMap(icao => aggregateAirport(icao, datafile))
    const atisFields = getAtisFields(datafile);
    const controllerFields = getControllerFields(datafile);

    const airportEmbed = new EmbedBuilder()
        .setColor(config.color)
        .setTimestamp()
        .setTitle(`${config.activity.title} ${relatime}`)
        .addFields(...airportFields);

    const atcEmbed = new EmbedBuilder()
        .setColor(config.color)
        .setTimestamp()
        .setTitle('ATC')
        .addFields(...getControllerFields(datafile));

    const atisEmbed = new EmbedBuilder()
        .setColor(config.color)
        .setTimestamp()
        .setTitle('ATIS')
        .addFields(...atisFields);

    const botMessages = (await channel.messages.fetch())
        .map(m => m ) // Makes it an array
        .filter(m => m.author.id === client.user.id);

    let embeds = [airportEmbed];
    if (controllerFields.length > 0) {
        embeds.push(atcEmbed);
    }
    if (atisFields.length > 0) {
        embeds.push(atisEmbed);
    }

    if (botMessages.length < 1) {
        await channel.send({
            embeds: embeds
        });
    } else {
        await botMessages[0].edit({
            embeds: embeds
        });
    }

}
