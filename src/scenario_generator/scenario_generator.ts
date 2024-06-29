import fs from "fs";
import path from "path";
import {finished} from 'stream/promises';
import {Readable} from 'stream';
import {ReadableStream} from 'stream/web';
import StreamZip from "node-stream-zip";
import {AirportData, ScenarioAirport, ScenarioIntensity, TrafficCounts} from "./types";
import airports from "./data/airports";
import {FlightSelector} from "./flight_selector";

export class ScenarioGenerator {
    private readonly besasDirectory: string;
    private desired: TrafficCounts = {
        initial: 0,
        ifrDepartures: 0,
        ifrArrivals: 0,
        vfrDepartures: 0,
        vfrArrivals: 0,
        faults: 0
    };
    private readonly airportData: AirportData;

    private buffer: string = "";

    public constructor(
        public readonly dataDirectory: string,
        public readonly airport: ScenarioAirport,
        private readonly configuration: string,
        private readonly initialPseudoPilot: string,
    ) {
        this.airportData = airports[this.airport];
        this.besasDirectory = path.join(this.dataDirectory, 'used_files');
        if (Object.keys(this.airportData.configurations)
            .findIndex(x => x === configuration) === -1) {
            throw new Error("Bad configuration");
        }
    }

    /**
     * Ensure we have the datafiles from besas in our data directory
     * @private
     */
    private async ensureBesasFiles(): Promise<void> {
        try {
            // TODO check outdated files
            await fs.promises.access(this.besasDirectory, fs.constants.R_OK);
            console.debug('No need to fetch besas files');
            return; // If succeeds, they exist
        } catch (_) {
        }

        const zipPath = path.join(this.dataDirectory, 'used_files.zip');

        const response = await fetch("http://wachters.be/BESAS2/used_files.zip");
        const fileStream = fs.createWriteStream(zipPath);
        await finished(Readable.fromWeb(response.body as ReadableStream<any>).pipe(fileStream))

        let zip = new StreamZip.async({file: zipPath});
        await zip.extract(null, this.dataDirectory);
        await zip.close();
        console.debug('Extracted besas files');
    }

    public setCounts(counts: TrafficCounts): this {
        this.desired = counts;
        return this;
    }

    public setVfr(departures: number, arrivals: number): this {
        this.desired.vfrDepartures = departures;
        this.desired.vfrArrivals = arrivals;
        return this;
    }

    public setIntensity(intensity: ScenarioIntensity): this {
        if (intensity == "CUSTOM" || intensity == "VFR") {
            return this; // They have all at zero, or custom
        }

        this.desired = airports[this.airport].intensity[intensity];
        return this;
    }

    private async appendControllers(): Promise<void> {
        const fixName = this.airportData.atcGroup;
        const file = path.join(this.besasDirectory, 'fix', `${fixName}.txt`);
        await this.appendFile(file);
    }

    private async appendApproaches(): Promise<void> {
        this.airportData
            .configurations[this.configuration]
            .approaches
            .forEach(x => this.append(x));
    }

    private async appendRoutes(): Promise<void> {
        for (const routeFile of this.airportData.configurations[this.configuration].routeFiles) {
            await this.appendFile(path.join(this.besasDirectory, 'fix', routeFile));
        }
    }

    private append(line: string): void {
        this.buffer += line;
        this.buffer += "\n";
    }

    private async appendFile(fileName: string): Promise<void> {
        this.append((await fs.promises.readFile(fileName)).toString());
    }

    public async build(): Promise<string> {
        await this.ensureBesasFiles();

        this.append(`AIRPORT_ALT:${this.airportData.elevation}`);
        await this.appendControllers();
        await this.appendApproaches();
        await this.appendRoutes();
        this.append("\n");

        const flightPlans = (await fs.promises.readFile(
            path.join(this.besasDirectory, 'flights', 'flights.txt')
        ))
            .toString()
            .split('\n')
            .filter(x => x.length > 2); // 2 characters could also just be \r\n

        // Now select flights :D
        const selector =
            new FlightSelector(this.initialPseudoPilot, this.airport, this.configuration, this.desired, flightPlans);

        await selector.setup();
        this.append(selector.select().toString());
        return this.buffer;
    }

}
