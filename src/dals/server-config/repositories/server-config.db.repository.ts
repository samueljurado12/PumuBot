import mongoose from "mongoose";
import { serverConfigContext } from "../server-config.context";
import { ServerConfig } from "../server-config.model";
import { ServerConfigRepository } from "./server-config.repository";

export const serverConfigDBRepository: ServerConfigRepository = {
    getServerConfig: async (serverId: string) => await serverConfigContext.findOne({ serverId }).lean(),
    saveServerConfig: async (serverId: string, channelId?: string, roleId?: string) => {
        const serverConfig = await serverConfigContext.findOne<ServerConfig>({ serverId }) ??
        {
            serverId
        };
        serverConfig.notificationChannelId = channelId ?? serverConfig.notificationChannelId;
        serverConfig.notificationRoleId = roleId ?? serverConfig.notificationRoleId;

        const updatedServerConfig = await serverConfigContext.findOneAndUpdate(
            {
                serverId
            },
            {
                $set: serverConfig
            },
            { upsert: true, returnDocument: "after" }
        ).lean();
        return updatedServerConfig;
    }
}