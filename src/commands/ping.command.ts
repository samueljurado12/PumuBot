import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "./command";
import { commandNames } from "#core/constants";


export const pingCommand: Command = {
    data: new SlashCommandBuilder().setName(commandNames.pingCommandName).setDescription("Replies with Pong!"),
    execute: async (interaction: CommandInteraction) => interaction.reply("Pong!")
}
