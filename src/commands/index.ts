import { Command } from './command';
import { pingCommand } from './ping.command';
import { setChannelCommand } from './set-channel.command';

export const commands: Command[] = [
    pingCommand,
    setChannelCommand
]