type TimestampFormat =
    | 'F'
    | 'f'
    | 'D'
    | 'd'
    | 't'
    | 'T'
    | 'R'
    ;

export function makeTimestamp(dateParseable: string, format: TimestampFormat = 'f'): string {
    const ts = (new Date(dateParseable).getTime() / 1000).toFixed(0);
    return `<t:${ts}:${format}>`;
}
