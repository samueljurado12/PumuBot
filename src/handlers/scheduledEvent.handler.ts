import { discordRestClient } from "#core/clients/discord-rest.client.js";
import { serverConfigRepository } from "#dals/server-config/repositories";
import { GuildScheduledEvent, REST, Routes } from "discord.js";

export const onScheduledEventCreate = async (scheduledEvent: GuildScheduledEvent) => {
    const { guildId, url } = scheduledEvent

    const { notificationChannelId, notificationRoleId } = await serverConfigRepository?.getServerConfig(guildId);
    if (!notificationChannelId || !notificationRoleId) return; //TODO Add error handler. Missing configuration

    await discordRestClient.post(
        Routes.channelMessages(notificationChannelId),
        {
            body: {
                content: `Esta es una prueba de mensaje para ver si el bot funciona, además añado el enlace ${url} y a ver si la mencion funciona <@&${notificationRoleId}>`,
                allowedMentions: {
                    parse: ["roles"],
                    roles: [notificationRoleId]
                }
            }

        }
    )
}