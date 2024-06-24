import fs from "fs";
import path from "path";
import {finished} from 'stream/promises';
import {Readable} from 'stream';
import {ReadableStream} from 'stream/web';
import StreamZip from "node-stream-zip";
import {ScenarioIntensity, TrafficCounts} from "./types";

export class ScenarioGenerator {
    private readonly dataDirectory: string;
    private readonly besasDirectory: string;
    private readonly airport: string;
    private desired: TrafficCounts = {
        starts: 0,
        ifrDepartures: 0,
        ifrArrivals: 0,
        vfrDepartures: 0,
        vfrArrivals: 0,
        faults: 0
    };

    public constructor(dataDirectory: string, airport: string) {
        this.dataDirectory = dataDirectory;
        this.besasDirectory = path.join(this.dataDirectory, 'used_files');
        this.airport = airport;
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

    }

    public async build(): Promise<void> {
        await this.ensureBesasFiles();
    }

}
