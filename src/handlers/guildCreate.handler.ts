import { deployCommandsSingleServer } from "#helpers";
import { Guild } from "discord.js";

export const onGuildCreate = async (guild: Guild) => deployCommandsSingleServer({ guildId: guild.id });