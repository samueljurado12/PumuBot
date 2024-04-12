import { discordClient } from '#core/clients/discord-client.js';
import '#core/load-env.js';
import { deployCommandsSingleServer } from '#helpers';


(async () => {
    discordClient.guilds.cache.forEach(g => deployCommandsSingleServer({ guildId: g.id }))
})()