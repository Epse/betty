import {HexColorString} from "discord.js";

export interface Config {
    /**
     * Name of this bot.
     * Will be reflected in commands and message bodies,
     * but the display name is set in the Discord developer portal.
     */
    name: string,
    color: HexColorString,
    voice: {
        /*
        Map of channel-name for automatically generated voice channels.
        Channel id references the source channel,
        channel-name is what the new channels will be called.
        Leave empty to disable the feature.
         */
        autogen_channels: Map<string, string>
    },
    events: {
        // Where to post events threads, not announcements
        announcement_channel_id: string
    },
    /*
    Settings for auto-deletion of messages.
    Used here to delete old backup requests,
    but could be used anywhere
     */
    backup_request: {
        // id's of users whose messages must stay
        ignore_uids: string[],
        delete_after_minutes: number,
        // id of channel to clean up
        channel_id: string
    },
    permissions: {
        // name of a role who get access to restricted commands like events and announcements. Not an ID
        all_access: string
    },
    loa: {
        // Ids of roles to mention on publication of new LoAs.
        mention_roles: string[]
    },
    // Settings for the live statistics
    activity: {
        // Id of channel to post them into
        channel_id: string,
        /*
        Title for the main embed, will be followed by a relative time since update.
        e.g. if the title is 'Belux VATSIM',
        the embed may be labeled 'Belux VATSIM 8 minutes ago'.
         */
        title: string,
        // Airport ICAOs, all uppercase
        airports: string[],
        /*
        Uppercase prefixes to also watch, useful for e.g. ACC
        For our purposes, the prefix ends at the _first_ underscore in a callsign.
         */
        additional_prefixes: string[]
    }
}
