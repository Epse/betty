import {Command} from "../../types/command";
import {BoardAuthorization} from "../../authorization/authorize";
import {
    BaseGuildTextChannel,
    ChannelType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder
} from "discord.js";
import {makeTimestamp} from "../../util/timestamp";

async function getStatsimLink(vatsimId: string): Promise<string> {
    const response = await fetch(`https://statsim.net/events/eventidbyvatsimid/?vatsimid=${vatsimId}`);
    if (!response.ok) {
        return "Not found";
    }

    const id = await response.text();
    return `[statsim.net](https://statsim.net/events/event/?eventid=${id})`;
}

export default {
    authorizedFor: new BoardAuthorization(),
    data: new SlashCommandBuilder()
        .setName('event')
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

        const embed = new EmbedBuilder()
            .setTitle(`**${event['name']}**`)
            .setColor(0x289fb8)
            .setImage(event['banner'])
            .setDescription(event['description'])
            .setURL(event['link'])
            .addFields(
                {name: 'Start', value: makeTimestamp(event['start_time']), inline: true},
                {name: 'End', value: makeTimestamp(event['end_time']), inline: true},
                {name: 'Airports', value: event['airports'].map(x => x['icao']).join(', '), inline: false},
                {name: 'Statsim URL (after event)', value: await getStatsimLink(id), inline: false},
            );

        if (!(channel instanceof BaseGuildTextChannel)) {
            console.warn('LOA channel not text');
            await interaction.reply({
                ephemeral: true,
                content: 'Selected channel is not a text channel'
            });
            return;
        }
        await (channel as BaseGuildTextChannel).send({
            embeds: [embed]
        });
        await interaction.reply({
            ephemeral: true,
            content: "👍 event posted!"
        });
    }

} satisfies Command;
