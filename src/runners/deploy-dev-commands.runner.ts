import '#core/load-env.js';
import { envConstants } from '#core/constants/envConstants.js';
import { deleteAllGlobalCommands, deployCommandsSingleServer } from '#helpers';


(async () => {
    deleteAllGlobalCommands();
    deployCommandsSingleServer({ guildId: envConstants.devServerId })
})()