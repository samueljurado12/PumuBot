import { Client } from "discord.js";

export const discordClient = new Client({
    intents: ["Guilds", "GuildMessages", "GuildScheduledEvents"]
})