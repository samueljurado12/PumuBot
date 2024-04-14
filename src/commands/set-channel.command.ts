import { ChannelType, CommandInteraction, InteractionResponse, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { Command } from "./command";
import { commandNames } from "#core/constants/command-names.js";
import { serverConfigRepository } from "#dals/server-config/repositories";

export const setChannelCommand: Command = {
    data: new SlashCommandBuilder().setName(commandNames.setChannelCommandName)
        .setDescription("Update notifications channel to the selected channel")
        .addChannelOption((option) => option.setName("channel").setDescription("New channel for notifications").setRequired(true).addChannelTypes(ChannelType.GuildText))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),


    execute: async (interaction: CommandInteraction) => {
        const channel = interaction.options.get("channel")?.channel;
        const { guildId } = interaction;
        const content = `Channel for notifications updated to ${channel?.name}`

        serverConfigRepository.saveServerConfig(guildId, channel.id);

        interaction.reply({ content, ephemeral: true });
    }
}