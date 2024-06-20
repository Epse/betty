import {Command} from "../../types/command";
import {BoardAuthorization} from "../../authorization/authorize";
import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import publish from "./publish";
import thread from "./thread";

const subcommands = [
    publish,
    thread,
];
let data = new SlashCommandBuilder()
    .setName('event')
    .setDescription('Tools for Events Department');

subcommands.forEach(sub => data.addSubcommand(
    command => sub.make(command)));

export default {
    authorizedFor: new BoardAuthorization(),
    data,
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const sub = interaction.options.getSubcommand(true);
        const command = subcommands.find(x => x.name == sub);
        if (command == undefined) {
            await interaction.reply({
                ephemeral: true,
                content: 'Subcommand does not exist, sowwy'
            });
            return;
        }
        await command.execute(interaction);
    }
} satisfies Command;
