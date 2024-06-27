export interface TrafficCounts {
    initial: number,
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

export interface RouteDefinition {
    spawn: string,
    route: string | null, // Without $ROUTE, without callsign or options
    reqAlt: string, // In the format fix:alt
}

export interface Configuration {
    approaches: string[],
    routeFiles: string[],
    routes: {
        vfr: RouteDefinition[],
        ifr: RouteDefinition[],
    }
}

export interface AirportData {
    atcGroup: AtcGroup,
    configurations: {
        [key: string]: Configuration
    },
    intensity: { [key in "LOW" | "MEDIUM" | "HIGH"]: TrafficCounts },
    elevation: string,
    departureAltitude: string,
}
