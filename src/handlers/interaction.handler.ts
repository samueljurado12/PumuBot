import { commands } from "#commands";
import { Interaction } from "discord.js";

export const onInteractionCreate = async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    const command = commands.find(c => c.data.name === commandName)
    command?.execute(interaction);
}