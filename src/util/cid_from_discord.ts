// Theoretically CIDs are strings, funnily enough
import {Maybe} from "../types/maybe";

export async function cidFromDiscord(id: string): Promise<Maybe<string>> {
    if (!global.cache.has('discord_cids'))
        global.cache.set('discord_cids', new Map<string, string>);
    const cached_cid = global.cache.get('discord_cids').get(id);
    if (cached_cid !== undefined) {
        return cached_cid;
    }

    const response = await fetch(`https://api.vatsim.net/v2/members/discord/${id}`);
    if (!response.ok) {
        return undefined;
    }
    const cid = await response.json().then((x: Object): string => x['user_id']);
    global.cache.get('discord_cids').set(id, cid);
    return cid;
}
