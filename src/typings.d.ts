declare module 'config.json' {
    export const name: string
    export const voice: {
        autogen_channels: Map<string, string>
    };
    export const events: {
        announcement_channel_id: string
    };
    export const backup_request: {
        ignore_uids: string[],
        delete_after_minutes: number,
        channel_id: string
    };
    export const permissions: {
        all_access: string
    };
    export const loa: {
        mention_roles: string[]
    };
}
