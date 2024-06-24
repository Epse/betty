import {
    ActionRowBuilder,
    ChatInputCommandInteraction, MessageActionRowComponentBuilder,
    MessageComponentInteraction, StringSelectMenuBuilder, StringSelectMenuInteraction,
    StringSelectMenuOptionBuilder
} from "discord.js";
import {ReplyableInteraction} from "../../types/interaction";
import {interactionIdSuffix} from "../../util/interaction";

const airportRunwaySelections = {
    EBBR: [
        '25S',
        '25RDEP25LARR',
        '07S',
        '19',
        '01',
        '2519DEP25RARR',
        '07DEP01ARR',
    ],
    EBAW: ['11', '29'],
    EBOS: ['08', '26'],
    EBCI: ['06', '24'],
    EBLG: ['04R', '22L'],
    ELLX: ['06', '24'],
};

export async function getRunwayConfig(airport: string, interaction: ReplyableInteraction): Promise<string> {
    const configs = airportRunwaySelections[airport]
        .map(x => new StringSelectMenuOptionBuilder()
            .setValue(x)
            .setLabel(x)
        );
    const id = `runway_config-${interactionIdSuffix(interaction)}`;
    const response = await (await interaction.followUp({
        ephemeral: true,
        content: 'Please select a runway config. Sorry for the... interesting names sometimes',
        components: [
            new ActionRowBuilder<MessageActionRowComponentBuilder>()
                .setComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId(id)
                        .setPlaceholder('Choose one')
                        .setOptions(configs)
                )
        ]
    })).awaitMessageComponent({
        filter: x => x.customId === id,
        time: 60_000
    }) as StringSelectMenuInteraction;
    await response.update({});

    return response.values[0];
}
