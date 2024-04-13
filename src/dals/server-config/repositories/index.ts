import { envConstants } from "#core/constants/envConstants.js";
import { serverMockRepository } from "./server-config.mock.repository";

export const serverConfigRepository = envConstants.isMockDb ? serverMockRepository : null