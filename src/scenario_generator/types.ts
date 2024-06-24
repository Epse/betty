export interface TrafficCounts {
    starts: number,
    ifrDepartures: number,
    ifrArrivals: number,
    vfrDepartures: number,
    vfrArrivals: number,
    faults: number,
}

export type ScenarioIntensity =
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "VFR"
    | "CUSTOM"
    ;

export type ScenarioAirport =
    | 'EBBR'
    | 'EBAW'
    | 'EBOS'
    | 'EBCI'
    | 'EBLG'
    | 'ELLX'
    ;

export type AtcGroup =
    | "atcBRApp"
    | "atcHigh"
    | "atcLGApp"
    | "atcLow"
    | "atcLXApp"
    ;


export interface AirportData {
    atcGroup: AtcGroup,
    configurations: {
        [key: string]: {
            approaches: string[],
            routeFiles: string[],
        }
    },
    intensity: { [key in "LOW" | "MEDIUM" | "HIGH"]: TrafficCounts },
    elevation: string,
    departureAltitude: string,
}
