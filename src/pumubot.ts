import '#core/load-env.js';
import { discordClient } from "#core/clients"
import { envConstants } from "#core/constants"
import { onInteractionCreate, onGuildCreate, onScheduledEventCreate, onGuildDelete } from "#handlers/";
import { connectToDBServer } from '#core/servers/db.server.js';

(async () => {
    discordClient.once("ready", async () => {
        console.log("Bot is ready");
        if (envConstants.isMockDb) {
            console.log("Using Mock DB");
        }
        else {
            await connectToDBServer(envConstants.mongoDbUri);
            console.log("Connected to DB");
        }
    })

    discordClient.on("guildCreate", async (guild) => await onGuildCreate(guild));

    discordClient.on("guildDelete", async (guild) => await onGuildDelete(guild));

    discordClient.on("interactionCreate", async (interaction) => await onInteractionCreate(interaction));

    discordClient.on("guildScheduledEventCreate", async (guildScheduledEvent) => await onScheduledEventCreate(guildScheduledEvent));


    discordClient.login(envConstants.discordToken);
})()