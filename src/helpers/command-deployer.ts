import { Routes } from "discord.js";

import { commands } from "#commands";
import { envConstants } from "#core/constants";
import { discordRestClient } from "#core/clients/discord-rest.client.js";
import { discordClient } from "#core/clients/discord.client.js";

const commandsData = Object.values(commands).map((command) => command.data.toJSON());

type DeployCommandsProps = {
    guildId: string;
};

export const deployCommandsSingleServer = async ({ guildId }: DeployCommandsProps) => {
    try {
        console.log("Started adding application (/) commands.");

        await discordRestClient.put(
            Routes.applicationGuildCommands(envConstants.discordClientId, guildId),
            {
                body: commandsData,
            }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
}

export const deployGlobalCommands = async () => {
    try {
        console.log("Started adding application (/) commands.");

        await discordRestClient.put(
            Routes.applicationCommands(envConstants.discordClientId),
            {
                body: commandsData,
            }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
}

export const deleteAllGlobalCommands = async () => {
    try {
        console.log("Deleting all application (/) commands.");

        await discordRestClient.put(
            Routes.applicationCommands(envConstants.discordClientId),
            {
                body: [],
            }
        );

        console.log("Successfully deleted application (/) commands.");
    } catch (error) {
        console.error(error);
    }
}