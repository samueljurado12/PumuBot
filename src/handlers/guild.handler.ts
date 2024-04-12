import { deployCommandsSingleServer } from "#helpers";
import { Guild } from "discord.js";

export const onGuildCreate = async (guild: Guild) => console.log("Hola");//deployCommandsSingleServer({ guildId: guild.id });

export const onGuildDelete = async (guild: Guild) => console.log(`See you, ${guild.name}`)