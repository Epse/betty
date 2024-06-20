import {EventHandler} from "../events";
import {Events} from "discord.js";

export default {
    name: Events.VoiceStateUpdate,
    once: false,
    execute()
} satisfies EventHandler;
