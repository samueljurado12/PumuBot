import {
  ChannelType,
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "./command";
import { commandNames } from "#core/constants/command-names.js";
import { serverConfigRepository } from "#dals/server-config/repositories";
import { checkChannelIsAccessible } from "#common/validations";

const validateParams = (member, channel) => {
  const errorMessage = checkChannelIsAccessible(member, channel);

  if (errorMessage) throw new Error(errorMessage);
};

export const setChannelCommand: Command = {
  data: new SlashCommandBuilder()
    .setName(commandNames.setChannelCommandName)
    .setDescription("Update notifications channel to the selected channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("New channel for notifications")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  execute: async (interaction: CommandInteraction) => {
    let content;
    try {
      const client = interaction.guild.members.me;
      const channel = interaction.options.get("channel")?.channel;
      validateParams(client, channel);

      const { guildId } = interaction;

      await serverConfigRepository.saveServerConfig(guildId, channel.id);
      content = `Channel for notifications updated to #${channel?.name}`;
    } catch (error) {
      content = error.message;
    } finally {
      interaction.reply({ content, ephemeral: true });
    }
  },
};
