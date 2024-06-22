import {
    ActionRowBuilder,
    ChatInputCommandInteraction,
    MessageActionRowComponentBuilder,
    MessageComponentInteraction, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder
} from "discord.js";
import {interactionIdSuffix} from "../../../util/interaction";

export async function getVfrIntensity(interaction: MessageComponentInteraction | ChatInputCommandInteraction):
    Promise<{ departures: number; arrivals: number }> {
    const interactionId = 'vfr_intensity-' + interactionIdSuffix(interaction);

    const deps = await (await interaction.followUp({
        ephemeral: true,
        content: 'Please select your VFR departures count',
        components: [
            new ActionRowBuilder<MessageActionRowComponentBuilder>()
                .setComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('dep-' + interactionId)
                        .setPlaceholder('Choose one')
                        .setOptions(
                            [...Array(10).keys()]
                                .map(n => new StringSelectMenuOptionBuilder()
                                    .setLabel(n.toFixed(0))
                                    .setValue(n.toFixed(0))
                                )
                        )
                )
        ]
    })).awaitMessageComponent({
        filter: x => x.customId === 'dep-' + interactionId,
        time: 60_000,
    }) as StringSelectMenuInteraction;
    await deps.update({});

    const arrs = await (await interaction.followUp({
        ephemeral: true,
        content: 'Please select your VFR arrivals count',
        components: [
            new ActionRowBuilder<MessageActionRowComponentBuilder>()
                .setComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('arr-' + interactionId)
                        .setPlaceholder('Choose one')
                        .setOptions(
                            [...Array(10).keys()]
                                .map(n => new StringSelectMenuOptionBuilder()
                                    .setLabel(n.toFixed(0))
                                    .setValue(n.toFixed(0))
                                )
                        )
                )
        ]
    })).awaitMessageComponent({
        filter: x => x.user.id === interaction.user.id,
        time: 60_000,
    }) as StringSelectMenuInteraction;
    await arrs.update({});

    return {
        departures: Number.parseInt(deps.values[0]),
        arrivals: Number.parseInt(arrs.values[0]),
    };
}
