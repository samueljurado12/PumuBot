import { CommandInteraction, InteractionResponse, SlashCommandBuilder } from "discord.js";
import { Command } from "./command";
import { commandNames } from "#core/constants/command-names.js";

export const setChannelCommand: Command = {
    data: new SlashCommandBuilder().setName(commandNames.setChannelCommandName)
        .setDescription("Update notifications channel to the selected channel")
        .addChannelOption((option) => option.setName("channel").setDescription("New channel for notifications").setRequired(true)),
    execute: async (interaction: CommandInteraction) => {
        const channel = interaction.options.data.find(opt => opt.name === "channel")?.channel

        interaction.reply(`Channel for notifications updated to ${channel?.name}`)
    }
}