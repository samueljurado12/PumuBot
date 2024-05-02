import { CommandInteraction, CacheType, SlashCommandBuilder, PermissionFlagsBits, CategoryChannel } from "discord.js";
import { Command } from "./command";
import { commandNames } from "#core/constants/command-names.js";
import { serverConfigRepository } from "#dals/server-config/repositories";
import { checkRoleCanBeMentioned } from "#common/validations";

const validateParams = (member, role) => {
    const errorMessage = checkRoleCanBeMentioned(member, role);

    if(errorMessage) throw new Error(errorMessage);
}

export const setRoleCommand: Command = {
    data: new SlashCommandBuilder()
        .setName(commandNames.setRoleCommandName)
        .setDescription("Update the notification role for events")
        .addRoleOption((role) => role.setRequired(true).setName("role").setDescription("New notification role that will be pinged when an event is created."))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    execute: async (interaction: CommandInteraction<CacheType>) => {
        let content;
        try {
            const client = interaction.guild.members.me;
            const role = interaction.options.get("role").role;
            validateParams(client, role);


            const { guildId } = interaction;

            await serverConfigRepository.saveServerConfig(guildId, null, role.id);
            content = `Notification role updated to ${role?.name}.`;
        } catch (error) {
            content = error.message;
        } finally {
            interaction.reply({ content, ephemeral: true });
        }
    }
}