import {loas} from '../../resources/loa';

import {ChannelType, ChatInputCommandInteraction, SlashCommandBuilder, TextChannel} from "discord.js";
import {Command} from "../../types/command";


const cmd = new SlashCommandBuilder()
      .setName('loa')
      .setDescription('Announce a new LOA')
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
      )
      .addStringOption(option =>
          option.setName('text')
                .setDescription('Extra text to mention in the announcement')
                .setRequired(false)
      );

const execute = async (interaction: ChatInputCommandInteraction) => {
    const loa = loas[interaction.options.getString('fir')].name;
    const channel = interaction.options.getChannel('channel');
    const text = interaction.options.getString('text');

    let infoMessage = 'Please check the following updated LoA\'s on our website:\n';
    infoMessage += '------------------------------------\n';
    infoMessage += `**${loa}**\n`;
    infoMessage += '------------------------------------\n';
    infoMessage += 'https://beluxvacc.org/controller-files/';
    if (text !== null) {
        infoMessage += `\n\n${text}`;
    }

    if (channel.type !== ChannelType.GuildText) {
        console.warn('LOA channel not text');
        await interaction.reply({
            ephemeral: true,
            content: 'Selected channel is not a text channel'
        });
        return;
    }
    await (channel as TextChannel).send(infoMessage);

    await interaction.reply({
        ephemeral: true,
        content: `✅ Done! Announcement placed in ${channel}!`
    });
}

export default {
    data: cmd,
    execute: execute,
    authorizedFor: '',
} satisfies Command;
