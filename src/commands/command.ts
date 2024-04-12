import { CommandInteraction, InteractionResponse, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

export interface Command {
    data: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
    | SlashCommandSubcommandsOnlyBuilder;
    execute: (interaction: CommandInteraction) => Promise<InteractionResponse<boolean>>
}