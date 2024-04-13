const getDiscordConstants = () => {
    const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;
    if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
        throw new Error("Missing environment variables");
    }

    return {
        discordToken: DISCORD_TOKEN,
        discordClientId: DISCORD_CLIENT_ID
    }
}

export const envConstants = {
    isMockDb: process.env.MOCK_CONFIG === "True",
    ...getDiscordConstants()
}