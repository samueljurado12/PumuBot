import { CommandInteraction, CacheType, SlashCommandBuilder, PermissionFlagsBits, CategoryChannel } from "discord.js";
import { Command } from "./command";
import { commandNames } from "#core/constants/command-names.js";
import { serverConfigRepository } from "#dals/server-config/repositories";

export const setRoleCommand: Command = {
    data: new SlashCommandBuilder()
        .setName(commandNames.setRoleCommandName)
        .setDescription("Update the notification role for events")
        .addRoleOption((role) => role.setRequired(true).setName("role").setDescription("New notification role that will be pinged when an event is created."))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    execute: async (interaction: CommandInteraction<CacheType>) => {
        let content;
        try {
            const role = interaction.options.get("role").role;
            const { guildId } = interaction;
            content = `Notification role updated to ${role?.name}.`;

            await serverConfigRepository.saveServerConfig(guildId, null, role.id);

        } catch (error) {
            content = "There was an error updating the role, make sure you've used /config first."
        } finally {
            interaction.reply({ content, ephemeral: true });
        }
    }
}