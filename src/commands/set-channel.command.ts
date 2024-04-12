import { CommandInteraction, CacheType, InteractionResponse, SlashCommandBuilder, SlashCommandChannelOption } from "discord.js";
import { Command } from "./command";

export const setChannelCommand: Command = {
    data: new SlashCommandBuilder().setName("setChannel")
        .setDescription("Update notifications channel to the selected channel")
        .addChannelOption((option) => option.setName("channel").setDescription("New channel for notifications").setRequired(true)),
    execute: function (interaction: CommandInteraction<CacheType>): Promise<InteractionResponse<boolean>> {
        throw new Error("Function not implemented.");
    }
}