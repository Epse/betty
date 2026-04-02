import {SubCommand} from "../../types/command";
import {
    BaseGuildTextChannel,
    ChannelType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandSubcommandBuilder
} from "discord.js";
import {makeTimestamp} from "../../util/timestamp";
import config from "../../util/config";

async function getStatsimLink(vatsimId: string): Promise<string> {
    if (process.env.STATSIM_API_KEY === undefined) {
        console.warn("No Statsim API Key configured.");
        return "Not found";
    }
    const response = await fetch(`https://api.statsim.net/api/Events/VatsimId?vatsimId=${vatsimId}`, {
        headers: {
            "X-API-KEY": process.env.STATSIM_API_KEY,
        }
    });
    if (!response.ok) {
        console.log(`Statsim id-to-statsim got ${response.status}`);
        return "Not found";
    }

    const id = await response.text();
    return `[statsim.net](https://statsim.net/events/${id})`;
}

export default {
    name: 'publish',
    make: (command: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder =>
        command
            .setName('publish')
            .setDescription('Publish a MyVatsim event to a discord channel')
            .addStringOption(option =>
                option.setName('id')
                    .setRequired(true)
                    .setDescription('The ID of an event on MyVatsim')
            )
            .addChannelOption(option =>
                option.setName('channel')
                    .setDescription('Channel to post in')
                    .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
                    .setRequired(true)
            ),
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const id = interaction.options.getString('id');
        const channel = interaction.options.getChannel('channel') as BaseGuildTextChannel;
        const eventUrl = 'https://my.vatsim.net/api/v2/events/view/' + id;

        const response = await fetch(eventUrl);
        if (!response.ok) {
            await interaction.reply({
                ephemeral: true,
                content: `Could not fetch event. We got status code: ${response.statusText}`
            });
            return;
        }


        const event = (await response.json())['data'];

        const statsim = await getStatsimLink(id);

        const embed = new EmbedBuilder()
            .setTitle(`**${event['name']}**`)
            .setColor(config.color)
            .setImage(event['banner'])
            .setDescription(event['description'])
            .setURL(event['link'])
            .addFields(
                {name: 'Start', value: makeTimestamp(event['start_time']), inline: true},
                {name: 'End', value: makeTimestamp(event['end_time']), inline: true},
                {name: 'Airports', value: event['airports'].map(x => x['icao']).join(', '), inline: false},
                {name: 'Statsim URL (after event)', value: statsim, inline: false},
            );

        if (!(channel instanceof BaseGuildTextChannel)) {
            await interaction.reply({
                ephemeral: true,
                content: 'Selected channel is not a text channel'
            });
            return;
        }
        const message = await (channel as BaseGuildTextChannel).send({
            embeds: [embed]
        });
        if (statsim != "Not found") {
            await interaction.reply({
                ephemeral: true,
                content: "👍 event posted!"
            });
        } else {
            await interaction.reply({
                ephemeral: true,
                content: "👍 event posted! Could not get Statsim URL, maybe ask tech why..."
            });
        }
        try {
            await message.crosspost();
        } catch (e) {
            await interaction.followUp({
                ephemeral: true,
                content: 'Could not crosspost, target channel is probably not an announcement channel'
            });
            console.log('Could not crosspost event, error: ' + e);
        }
    }

} satisfies SubCommand;
