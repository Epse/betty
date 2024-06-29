import airports from "./airports";

// TODO: probably also want caching here

export class Gate {
    public readonly altitude: string;

    public constructor(
        public readonly airport: string,
        public readonly gate: string,
        public readonly apron: string,
        public readonly latitude: number,
        public readonly longitude: number,
        public readonly heading: number,
    ) {
        this.altitude = airports[this.airport]?.elevation;
    }

    public getESHeading(): string {
        return Math.floor((this.heading * 2.88 + 0.5) * 4).toFixed(0);
    }

    // Excludes the :0 at the end
    public toLocationString(): string {
        return `${this.latitude}:${this.longitude}:${this.altitude}:0:${this.getESHeading()}`;
    }
}

export async function fetchGates(): Promise<Gate[]> {
    const response = await fetch('https://api.beluxvacc.org/belux-gate-manager-api/gates/');
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json()
        .then((body: Object[]): Gate[] =>
            body.map(x => new Gate(
                x['airport'],
                x['gate'],
                x['apron'],
                x['latitude'],
                x['longitude'],
                x['heading']
            )));
}
