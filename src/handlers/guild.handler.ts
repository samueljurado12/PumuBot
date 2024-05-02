import { serverConfigRepository } from "#dals/server-config/repositories";
import { Guild } from "discord.js";

export const onGuildCreate = async (guild: Guild) => console.log(`Joined ${guild.name}.`);

export const onGuildDelete = async (guild: Guild) => {
    console.log(`See you, ${guild.name}`);
    serverConfigRepository.deleteServerConfig(guild.id);
}