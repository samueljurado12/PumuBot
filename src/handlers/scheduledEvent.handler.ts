import { discordRestClient } from "#core/clients/discord-rest.client.js";
import { serverConfigRepository } from "#dals/server-config/repositories";
import { GuildScheduledEvent, REST, Routes } from "discord.js";

export const onScheduledEventCreate = async (
  scheduledEvent: GuildScheduledEvent
) => {
  const { guildId, url } = scheduledEvent;

  const serverConfig = await serverConfigRepository?.getServerConfig(guildId);
  if (!serverConfig) return; //TODO Add error handler. Missing configuration

  const { notificationChannelId, notificationRoleId } = serverConfig;

  const content = `<@&${notificationRoleId}> ${url}`;

  await discordRestClient.post(Routes.channelMessages(notificationChannelId), {
    body: {
      content,
      allowedMentions: {
        parse: ["roles"],
        roles: [notificationRoleId],
      },
    },
  });
};
