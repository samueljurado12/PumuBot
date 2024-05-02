import {
  CommandInteraction,
  CacheType,
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
} from "discord.js";
import { Command } from "./command";
import { commandNames } from "#core/constants/command-names.js";
import { serverConfigRepository } from "#dals/server-config/repositories";
import {
  checkChannelIsAccessible,
  checkRoleCanBeMentioned,
} from "#common/validations";

const validateParams = (member, channel, role) => {
  let errorMessage =
    checkRoleCanBeMentioned(member, role) +
    checkChannelIsAccessible(member, channel);

  if (errorMessage) throw new Error(errorMessage);
};

export const setConfigCommand: Command = {
  data: new SlashCommandBuilder()
    .setName(commandNames.setConfigCommandName)
    .setDescription(
      "Creates and updates the configuration for the notification of scheduled events"
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("New channel for notifications")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addRoleOption((role) =>
      role
        .setRequired(true)
        .setName("role")
        .setDescription(
          "New notification role that will be pinged when an event is created."
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  execute: async (interaction: CommandInteraction<CacheType>) => {
    const client = interaction.guild.members.me;
    const channel = interaction.options.get("channel")?.channel;
    const role = interaction.options.get("role")?.role;
    let content;
    try {
      validateParams(client, channel, role);
      const { guildId } = interaction;

      await serverConfigRepository.saveServerConfig(
        guildId,
        channel.id,
        role.id
      );
      content = `Notification channel and role succesfully changed. New values are #${channel.name} and ${role.name}`;
    } catch (e) {
      content = e.message;
    } finally {
      interaction.reply({ content, ephemeral: true });
    }
  },
};
