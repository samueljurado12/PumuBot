import { Schema } from "mongoose";
import { ServerConfig } from "./server-config.model";

export const ServerConfigSchema = new Schema<ServerConfig>({
    serverId: { type: String, required: true },
    notificationChannelId: { type: String },
    notificationRoleId: { type: String },
});