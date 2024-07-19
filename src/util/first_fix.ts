export function firstFix(route: string): string {
    const re = /([A-Z]{3,5})/;
    const matches = route.match(re);
    return matches.length > 0 ? matches[0] : route;
}
