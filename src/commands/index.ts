import { Command } from './command';
import { setChannelCommand } from './set-channel.command';
import { setConfigCommand } from './set-config.command';
import { setRoleCommand } from './set-role.command';

export const commands: Command[] = [
    setChannelCommand,
    setRoleCommand,
    setConfigCommand,
]