import { model } from "mongoose";
import { ServerConfig } from "./server-config.model";
import { ServerConfigSchema } from "./server-config.schema";

export const serverConfigContext = model<ServerConfig>("serverConfig", ServerConfigSchema, "serverConfig");