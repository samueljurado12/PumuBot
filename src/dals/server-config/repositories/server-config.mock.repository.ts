import { ServerConfig } from "../server-config.model";
import { ServerConfigRepository } from "./server-config.repository";
import { db } from "#dals/mock-data";

const insertServerConfig = (serverId: string, notificationChannelId?: string, notificationRoleId?: string) => {
    if (!notificationChannelId || !notificationRoleId) return; //TODO Need to throw error, first config need to be done with both fields
    const newServerConfig: ServerConfig = {
        serverId,
        notificationChannelId,
        notificationRoleId
    }

    db.serverConfigs.push(newServerConfig);
    return newServerConfig;
}

const updateServerConfig = (serverId: string, notificationChannelId?: string, notificationRoleId?: string) => {
    const updatedServerConfig = db.serverConfigs.find(conf => conf.serverId === serverId);
    updatedServerConfig.notificationChannelId = notificationChannelId ?? updatedServerConfig.notificationChannelId;
    updatedServerConfig.notificationRoleId = notificationRoleId ?? updatedServerConfig.notificationRoleId;

    db.serverConfigs = db.serverConfigs.map((c) =>
        c.serverId === updatedServerConfig.serverId ? { ...c, ...updatedServerConfig } : c
    );

    return updatedServerConfig;
}

export const serverMockRepository: ServerConfigRepository = {
    getServerConfig: async (serverId: string) => db.serverConfigs.find(c => c.serverId === serverId),
    saveServerConfig: async (serverId: string, channelId?: string | undefined, roleId?: string | undefined) => db.serverConfigs.some(c => c.serverId === serverId) ?
        updateServerConfig(serverId, channelId, roleId) :
        insertServerConfig(serverId, channelId, roleId)
}