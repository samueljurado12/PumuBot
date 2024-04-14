import { envConstants } from "#core/constants/envConstants.js";
import { serverConfigDBRepository } from "./server-config.db.repository";
import { serverMockRepository } from "./server-config.mock.repository";

export const serverConfigRepository = envConstants.isMockDb ? serverMockRepository : serverConfigDBRepository