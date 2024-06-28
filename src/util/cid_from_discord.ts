// Theoretically CIDs are strings, funnily enough
import {Maybe} from "../types/maybe";

// TODO caching??
export async function cidFromDiscord(id: string): Promise<Maybe<string>> {
    const response = await fetch(`https://api.vatsim.net/v2/members/discord/${id}`);
    if (!response.ok) {
        return undefined;
    }
    return await response.json().then((x: Object): string => x['user_id']);
}
