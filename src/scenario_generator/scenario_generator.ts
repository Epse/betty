import fs from "fs";
import path from "path";
import {finished} from 'stream/promises';
import {Readable} from 'stream';
import {ReadableStream} from 'stream/web';
import StreamZip from "node-stream-zip";
import {AirportData, ScenarioAirport, ScenarioIntensity, TrafficCounts} from "./types";
import airports from "./data/airports";

export class ScenarioGenerator {
    private readonly dataDirectory: string;
    private readonly besasDirectory: string;
    private readonly airport: ScenarioAirport;
    private desired: TrafficCounts = {
        starts: 0,
        ifrDepartures: 0,
        ifrArrivals: 0,
        vfrDepartures: 0,
        vfrArrivals: 0,
        faults: 0
    };
    private readonly configuration: string;
    private readonly airportData: AirportData;

    private buffer: string;

    public constructor(dataDirectory: string, airport: ScenarioAirport, configuration: string) {
        this.airport = airport;
        this.airportData = airports[this.airport];
        this.dataDirectory = dataDirectory;
        this.besasDirectory = path.join(this.dataDirectory, 'used_files');
        if (Object.keys(this.airportData.configurations)
            .findIndex(x => x === configuration) === -1) {
            throw new Error("Bad configuration");
        }
        this.configuration = configuration;
    }

    /**
     * Ensure we have the datafiles from besas in our data directory
     * @private
     */
    private async ensureBesasFiles(): Promise<void> {
        try {
            // TODO check outdated files
            await fs.promises.access(this.besasDirectory, fs.constants.R_OK);
            return; // If succeeds, they exist
        } catch (_) {
        }

        const zipPath = path.join(this.dataDirectory, 'used_files.zip');

        const response = await fetch("http://wachters.be/BESAS2/used_files.zip");
        const fileStream = fs.createWriteStream(zipPath);
        await finished(Readable.fromWeb(response.body as ReadableStream<any>).pipe(fileStream))

        let zip = new StreamZip.async({file: zipPath});
        await fs.promises.mkdir(this.besasDirectory);
        await zip.extract(null, this.besasDirectory);
        await zip.close();
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
        Object.keys(
            this.airportData
                .configurations[this.configuration]
        ).forEach(x => this.append(x));
    }

    private async appendRoutes(): Promise<void> {
        for (const routeFile of this.airportData.configurations[this.configuration].routeFiles) {
            await this.appendFile(path.join(this.besasDirectory, 'fix',  routeFile));
        }
    }

    private append(line: string): void {
        this.buffer += line;
        this.buffer += "\n";
    }

    private async appendFile(fileName: string): Promise<void> {
        this.append((await fs.promises.readFile(fileName)).toString());
    }

    public async build(): Promise<void> {
        await this.ensureBesasFiles();

        this.append(`AIRPORT_ALT:${this.airportData.elevation}`);
        await this.appendControllers();
        await this.appendApproaches();
        await this.appendRoutes();

        // Now make flights :D
    }

}
