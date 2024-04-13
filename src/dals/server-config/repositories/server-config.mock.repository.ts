import { ServerConfig } from "../server-config.model";
import { ServerConfigRepository } from "./server-config.repository";
import { db } from "#dals/mock-data";

export const serverMockRepository: ServerConfigRepository = {
    getServerConfig: async (serverId: string) => db.serverConfigs.find(c => c.serverId === serverId),
    upsertServerConfig: function (serverId: string, channelId?: string | undefined, roleId?: string | undefined): Promise<ServerConfig> {
        throw new Error("Function not implemented.");
    }
}