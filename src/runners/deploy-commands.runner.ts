import '#core/load-env.js';
import { deployCommandsAllServers } from "#helpers"
import { config } from "dotenv";


(async () => {
    config()
    await deployCommandsAllServers();
})()