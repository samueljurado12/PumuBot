import { Command } from './command';
import { setChannelCommand } from './set-channel.command';
import { setRoleCommand } from './set-role.command';

export const commands: Command[] = [
    setChannelCommand,
    setRoleCommand
]