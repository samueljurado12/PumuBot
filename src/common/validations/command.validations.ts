import { APIRole, GuildMember, Role, TextChannel } from "discord.js"

export const checkRoleCanBeMentioned = (member: GuildMember, role: Role | APIRole): string => {
    return member.permissions.has("MentionEveryone") || role.mentionable ? "" :
    `Bot can't mention given role ${role.name}. Make sure role is mentionable or that the bot has permissiones to mention all roles\n`;
}

export const checkChannelIsAccessible = (member: GuildMember, channel: TextChannel): string => {
    return member.permissionsIn(channel).has("ViewChannel") && member.permissionsIn(channel).has("SendMessages") && member.permissionsIn(channel).has("EmbedLinks") ? "" : 
    `Bot can't write or don't have access to the provided channel #${channel.name}. Please, review that bot has View Channel, Send Messages and Embed Links permissions on #${channel.name}`;
}


