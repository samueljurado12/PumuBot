import { ServerConfig } from "./server-config"

export interface DB {
    serverConfigs: ServerConfig[]
}

export const db: DB = {
    serverConfigs: [
        {
            serverId: "1225524197854417077",
            notificationChannelId: "1225524198554992654",
            notificationRoleId: "1228623427074785342"
        }
    ]
}