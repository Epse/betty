import loas from '../../resources/loa.json';
import config from "../../util/config";

import {
    BaseGuildTextChannel,
    ChannelType,
    ChatInputCommandInteraction, EmbedBuilder,
    ModalBuilder,
    SlashCommandBuilder, TextInputBuilder,
    TextInputStyle,
} from "discord.js";
import {Command} from "../../types/command";
import {BoardAuthorization} from "../../authorization/authorize";
import {interactionIdSuffix} from "../../util/interaction";
import {buildRows} from "../../util/modal";


const cmd = new SlashCommandBuilder()
    .setName('loa')
    .setDescription('Announce a new LOA')
    .setDMPermission(false)
    .addStringOption(option => {
        option.setName('fir')
            .setDescription('The FIR the LOA is with')
            .setRequired(true);

        const ll = Object.keys(loas).map(l => {
            return {name: l, value: l};
        });
        option.addChoices(...ll);
        return option;
    })
    .addChannelOption(option =>
        option.setName('channel')
            .setDescription('Channel to post in')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
    );

const execute = async (interaction: ChatInputCommandInteraction) => {
    const loa = loas[interaction.options.getString('fir')].name;
    const channel = interaction.options.getChannel('channel');

    const modal_id = 'loa_modal-' + interactionIdSuffix(interaction);
    const modal = new ModalBuilder()
        .setTitle("New LoA Announcement")
        .setCustomId(modal_id)
        .setComponents(
            ...buildRows([
                new TextInputBuilder()
                    .setRequired(false)
                    .setCustomId('text')
                    .setStyle(TextInputStyle.Paragraph)
                    .setLabel('Extra comment')
                    .setPlaceholder('Here you can add some extra text to appear in the announcement.'),
            ])
        );
    await interaction.showModal(modal);
    // TODO deal with the timeout
    const modalInteraction = await interaction.awaitModalSubmit({
        filter: (interaction) => interaction.customId === modal_id,
        time: 20_000,
    });
    const text = modalInteraction.fields.getTextInputValue('text');

    let infoMessage = "Please check the following updated LoA's on our website:\n";
    infoMessage += `### ${loa}\n\n`;
    infoMessage += 'https://beluxvacc.org/controller-files/';
    if (text !== null) {
        infoMessage += `\n\n${text}\n`;
    }
    infoMessage += config.loa.mention_roles.map(x => `<@&${x}>`).join(' ');

    if (!(channel instanceof BaseGuildTextChannel)) {
        console.warn('LoA channel not text');
        await modalInteraction.reply({
            ephemeral: true,
            content: 'Selected channel is not a text channel'
        });
        return;
    }
    await (channel as BaseGuildTextChannel).send({
        content: infoMessage,
    });

    await modalInteraction.reply({
        ephemeral: true,
        content: `✅ Done! Announcement placed in ${channel}!`,
    });
}

export default {
    data: cmd,
    execute: execute,
    authorizedFor: new BoardAuthorization(),
} satisfies Command;
