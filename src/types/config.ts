export interface Config {
    name: string,
    voice: {
        autogen_channels: Map<string, string>
    },
    events: {
        announcement_channel_id: string
    },
    backup_request: {
        ignore_uids: string[],
        delete_after_minutes: number,
        channel_id: string
    },
    permissions: {
        all_access: string
    },
    loa: {
        mention_roles: string[]
    }
}
