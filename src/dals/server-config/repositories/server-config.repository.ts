import { ServerConfig } from "../server-config.model";

export interface ServerConfigRepository {
    getServerConfig: (serverId: string) => Promise<ServerConfig>
    upsertServerConfig: (serverId: string, channelId?: string, roleId?: string) => Promise<ServerConfig>
}