export enum TimestampFormat {
    Full = 'F',
    DateTime = 'f',
    HumanDate = 'D',
    Date = 'd',
    Time = 't',
    TimeSeconds = 'T',
    Relative = 'R'
}

export function makeTimestamp(dateParseable: string, format: TimestampFormat = TimestampFormat.DateTime): string {
    const ts = (new Date(dateParseable).getTime() / 1000).toFixed(0);
    return `<t:${ts}:${format.toString()}>`;
}
