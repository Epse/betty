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

export type WeightCategory =
    | "L"
    | "M"
    | "H"
    | "J"
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

export type TrafficType =
    | "Light"
    | "LowCost"
    | "NonSchengen"
    | "Schengen"
    | "Cargo"
    | "Military"
    | "Medium"
    | "Heavy"
    | "GA"
    | "Private"
    ;

export interface RouteDefinition {
    spawn: string,
    route?: string | null, // Without $ROUTE, without callsign or options
    reqAlt: string, // In the format fix:alt
    only?: TrafficType[][], // OR of ANDs
    deny?: TrafficType[][], // OR of ANDs
}

export interface BalanceCategories {
    [key: string]: BalanceCategory
}

export interface Configuration {
    approaches: string[],
    routeFiles: string[],
    routes: {
        vfr: RouteDefinition[],
        ifr: RouteDefinition[],
    }
    // Traffic will as much as possible be balanced across these categories
    departureBalanceCategories?: BalanceCategories
}

/*
Defines categories to be assigned to departing traffic,
such that these different categories will all receive a rougly equal amount of traffic.

Traffic is assigned to the first category that matches one of its types or initial fix,
or a hidden "Others" category.
 */
export interface BalanceCategory {
    types?: TrafficType[],
    fixes?: string[],
    proportion: number, // Which fraction of the traffic should this receive?
}

export interface ApronMapping {
    types: TrafficType[],
    aprons: string[]
};

export interface AirportData {
    atcGroup: AtcGroup,
    configurations: {
        [key: string]: Configuration
    },
    /*
    When deciding a departure spawn, we iterate over this mapping in order
    The first mapping entry where all types match will give us the list of aprons to randomly select from.
    Empty array always matches.
    Empty mapping ensures we always pick at random
     */
    apronMapping: ApronMapping[],
    intensity: { [key in "LOW" | "MEDIUM" | "HIGH"]: TrafficCounts },
    elevation: string,
    departureAltitude: string,
}
