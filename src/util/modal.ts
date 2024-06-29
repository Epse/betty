import {ActionRowBuilder, ModalActionRowComponentBuilder, TextInputBuilder} from "discord.js";

type ModalComponents =
    | []
    | [TextInputBuilder]
    | [TextInputBuilder, TextInputBuilder]
    | [TextInputBuilder, TextInputBuilder, TextInputBuilder]
    | [TextInputBuilder, TextInputBuilder, TextInputBuilder, TextInputBuilder]
    | [TextInputBuilder, TextInputBuilder, TextInputBuilder, TextInputBuilder, TextInputBuilder]
    ;

export function buildRows(components: ModalComponents): ActionRowBuilder<TextInputBuilder>[] {
    return components
        .map((component: TextInputBuilder) =>
            new ActionRowBuilder<ModalActionRowComponentBuilder>()
                .addComponents(component))
}
