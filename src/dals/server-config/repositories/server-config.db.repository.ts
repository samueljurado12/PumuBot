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

        if(!(serverConfig.notificationChannelId && serverConfig.notificationRoleId)) throw new Error("This server has no config setup. Please, make sure to use /config first.")

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
    },

    deleteServerConfig: async (serverId: string) => {
        const deletedRecords = await serverConfigContext.deleteOne({serverId}).lean()
        return deletedRecords.deletedCount
    }
}