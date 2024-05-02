import { ServerConfig } from "../server-config.model";

export interface ServerConfigRepository {
    getServerConfig: (serverId: string) => Promise<ServerConfig>
    saveServerConfig: (serverId: string, channelId?: string, roleId?: string) => Promise<ServerConfig>
    deleteServerConfig: (serverId: string) => Promise<number>
}