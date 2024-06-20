import {EventHandler} from "../events";
import {Events, VoiceState} from "discord.js";
import * as Config from '../../../config.json';

async function leftChannel(oldState: VoiceState): Promise<void> {
    if (oldState.channel.members.size > 0)
        return; // Leave it

    if (Object.keys(Config.voice.autogen_channels).findIndex(x => x == oldState.channel.name) === -1)
        return; // Not our channel

    await oldState.channel.delete();
}

async function joinedChannel(newState: VoiceState): Promise<void> {
    const channelName = Object.entries(Config.voice.autogen_channels)
        .find(([key, val]) => val == newState.channelId );
    if (channelName === undefined)
        return; // None of our business then

    const newChannel = await newState.channel.clone({
        name: channelName[0],
    });
    await newState.member.voice.setChannel(newChannel);
}

export default {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(oldState: VoiceState, newState: VoiceState): Promise<void> {
        if (oldState.channelId === newState.channelId)
            return; // Who cares

        if (newState.channelId !== null) {
            await joinedChannel(newState);
        }
        if (oldState.channelId !== null) {
            await leftChannel(oldState);
        }
    }
} satisfies EventHandler;
