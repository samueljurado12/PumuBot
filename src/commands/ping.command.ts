import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "./command";


export const pingCommand: Command = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
    execute: async (interaction: CommandInteraction) => interaction.reply("Pong!")
}
