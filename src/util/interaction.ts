import {BaseInteraction} from "discord.js";

export function interactionIdSuffix(interaction: BaseInteraction): string {
    const id = Math.floor(Math.random() * 1_000);
    return `${interaction.user.id}-${id.toFixed(0)}`;
}
