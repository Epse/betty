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
