import { CommandInteraction, CacheType, SlashCommandBuilder, ChannelType, PermissionFlagsBits } from "discord.js";
import { Command } from "./command";
import { commandNames } from "#core/constants/command-names.js";
import { serverConfigRepository } from "#dals/server-config/repositories";

export const setConfigCommand: Command = {
    data: new SlashCommandBuilder()
        .setName(commandNames.setConfigCommandName)
        .addChannelOption((option) => option.setName("channel").setDescription("New channel for notifications").setRequired(true).addChannelTypes(ChannelType.GuildText))
        .addRoleOption((role) => role.setRequired(true).setName("role").setDescription("New notification role that will be pinged when an event is created."))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    execute: async (interaction: CommandInteraction<CacheType>) => {
        const channel = interaction.options.get("channel")?.channel;
        const role = interaction.options.get("role")?.role;
        const content = `Notification channel and role succesfully changed. New values are #${channel.name} and ${role.name}`;

        const { guildId } = interaction;

        serverConfigRepository.saveServerConfig(guildId, channel.id, role.id);

        interaction.reply({ content, ephemeral: true });
    }
}