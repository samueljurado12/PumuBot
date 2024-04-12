import '#core/load-env.js';
import { discordClient } from "#core/clients"
import { envConstants } from "#core/constants"
import { onInteractionCreate, onGuildCreate, onScheduledEventCreate, onGuildDelete } from "#handlers/";

(async () => {
    discordClient.once("ready", () => {
        console.log("Bot is ready");
    })

    discordClient.on("guildCreate", async (guild) => await onGuildCreate(guild));

    discordClient.on("guildDelete", async (guild) => await onGuildDelete(guild))

    discordClient.on("interactionCreate", async (interaction) => await onInteractionCreate(interaction));

    discordClient.on("guildScheduledEventCreate", async (guildScheduledEvent) => await onScheduledEventCreate(guildScheduledEvent));


    discordClient.login(envConstants.discordToken)
})()