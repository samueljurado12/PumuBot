import { REST, Routes } from "discord.js";

import { commands } from "#commands";
import { envConstants } from "#core/constants";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(envConstants.discordToken);

type DeployCommandsProps = {
    guildId: string;
};

export const deployCommandsSingleServer = async ({ guildId }: DeployCommandsProps) => {
    try {
        console.log("Started adding application (/) commands.");

        await rest.put(
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

export const deployCommandsAllServers = async () => {
    try {
        console.log("Refreshing application commands in all servers.");

        await rest.put(
            Routes.applicationCommands(envConstants.discordClientId),
            {
                body: commandsData
            }
        );

        console.log("Succesfully refreshed application commands in all servers");
    }
    catch (error) {
        console.log(error);
    }
}