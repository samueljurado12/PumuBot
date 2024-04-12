import { commands } from "#commands";
import { discordClient } from "#core/clients"
import { envConstants } from "#core/constants"
import { onInteractionCreate } from "#handlers/";
import { onGuildCreate } from "#handlers/guildCreate.handler";
import { deployCommandsSingleServer } from "#helpers";

(async () => {
    discordClient.once("ready", () => {
        console.log("Bot is ready");
    })

    discordClient.on("guildCreate", async (guild) => await onGuildCreate(guild));

    discordClient.on("interactionCreate", async (interaction) => await onInteractionCreate(interaction))

    discordClient.on("guildScheduledEventCreate", async (guildScheduledEvent) => {
        console.log(guildScheduledEvent);
        const { guildId } = guildScheduledEvent;


    })


    discordClient.login(envConstants.discordToken)
})()