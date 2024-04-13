import { REST } from "discord.js";
import { envConstants } from "../constants";


export const discordRestClient = new REST({ version: "10" }).setToken(envConstants.discordToken);
