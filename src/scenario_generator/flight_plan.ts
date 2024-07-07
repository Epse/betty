import assert from "node:assert";
import {GateAssigner} from "./gate_assigner";
import {WeightCategory} from "./types";

/*
Stores data about a flight plan and converts it into useful formats for ES.
A scenario entry looks like this:
- definition line
- flight plan line
- route line, for inbounds (external)
- simdata line
- req alt line (external)
- start offset (for flight slector module)
- initialpseudopilot line (for some other module)
 */
export class FlightPlan {
    public readonly squawk: string;

    public constructor(
        public callsign: string,
        public rules: "I" | "V",
        public aircraft: string, // includes weight category
        public departure: string,
        public departureTime: string,
        public route: string,
        public tas: string,
        public rfl: string,
        public arrival: string,
        public flightTime: string,
        public alternate: string,
    ) {
        this.squawk = this.generateSquawk();
    }

    public static fromEntry(entry: string): FlightPlan {
        /*
        Example entry so you can follow along:
        RMA0013 130002 FF EBBRRAMS 130002 EUCHZMFP (FPL-RYR148U-IS-B738/M-SDE3FGIJ1LRWYZ/SB1-LRIA0735-N0317F100 ARPIG P133 TOMUC/N0440F340 DCT KARIL DCT RIGSA DCT PITOK DCT SLC/N0451F380 DCT LALES DCT BNO DCT OKG L984 LONLI DCT MARZA DCT ESAMA/N0381F260 T880 ADMUM/N0370F240 T880 BATTY-EBCI0230 LFQQ-PBN/A1B1B5D1D3L1O1S2 COM/TCAS DOF/240613 REG/EIDHG EET/LHCC0034 LZBB0049 LKAA0105 EDUU0136 EDGG0206 EBUR0212 EBBU0223 CODE/4CA263 RVR/200 IFP/MODESASP OPR/RYR ORGN/DUBOEFR PER/C TALT/LROP RMK/CONTACT +353 1 9451990 TCAS)
         */
        const parts = entry.split('-');
        const callsign = parts[1];
        const rules = parts[2][0] === 'V' ? 'V' : 'I'; // Realistically the char should always be I or V, but types
        const aircraft = parts[3];
        // part 4 is the equipment, we don't need that right now
        const departure = parts[5].substring(0, 4);
        const departureTime = parts[5].substring(4);
        const route = parts[6];

        // This section usually looks like N0132F100, but could also be N0070VFR, or K0130VFR
        const speedLevelSection = route.split(' ')[0];
        const speedAlt = this.parseSpeedAltitude(speedLevelSection);

        // part 7 looks like EBBR0123 followed by a space-seperated list of alternates
        const arrival = parts[7].substring(0, 4);
        const alternate = parts[7].split(' ')[1]; // First alternate should be fine
        const flightTime = parts[7].substring(4, 8);

        return new FlightPlan(
            callsign,
            rules,
            aircraft,
            departure,
            departureTime,
            route,
            speedAlt.tas,
            speedAlt.altitude,
            arrival,
            flightTime,
            alternate
        );
    }

    /*
    Parses the ICAO item 15 speed and altitude section on a best-effort basis.
    input consists of two parts, speed and altitude.

    Speed can be:
        - N0000, aka speed in knots TAS
        - K0000, aka speed in km/h TAS
        - M000, aka mach speeds. We do not parse mach

    Altitude can be:
        - F000, aka flight level
        - A123, aka altitude (12300ft in this case)
        - S1234, aka metric flight level
        - M0123, aka 1230m of altitude
        - VFR
     */
    private static parseSpeedAltitude(input: string): { tas: string, altitude: string } {
        let output = {tas: '', altitude: ''};
        switch (input[0]) {
            case 'N':
                output.tas = input.substring(1, 5);
                input = input.substring(5);
                break;
            case 'K':
                output.tas = (parseInt(input.substring(1, 5), 10) * 1.852).toFixed(0).padStart(4, '0');
                input = input.substring(5);
                break;
            default:
                output.tas = Math.round(Math.random() * 200 + 200).toFixed(0).padStart(4, '0');
        }

        if (input == 'VFR') {
            output.altitude = '2000';
            return output;
        }

        switch (input[0]) {
            // Standard levels are identical to altitudes for our cases
            case 'F':
            case 'A':
                output.altitude = input.substring(1, 4) + '00';
                break;
            case  'M':
            case 'S':
                output.altitude = Math.round(parseInt(input.substring(1, 5), 10) * 10 * 0.3048)
                    .toFixed(0)
                    .padStart(4, '0')
                break;
            default:
                output.altitude = '2000';
                break;
        }

        return output;
    }

    private generateSquawk(): string {
        if (this.rules == "V") {
            return "7000";
        }

        // We randomly select between 0o8887 and 0o0, + 1  to avoid selecting 0000
        // 0000 is interpreted by Euroscope as a vehicle

        const maxOctal = parseInt("7776", 8);
        const squawkDecimal = Math.round(Math.random() * maxOctal) + 1;
        return squawkDecimal.toString(8).padStart(4, '0');
    }

    private getFuelHours(): string {
        return (parseInt(this.flightTime.substring(0, 2), 10) + 1).toFixed(0).padStart(2, '0');
    }

    private getRemarks(): string {
        return '/V/';
    }

    public isLight(): boolean {
        return this.aircraft.endsWith('/L');
    }

    public weightCategory(): WeightCategory {
        return this.aircraft.at(this.aircraft.length - 1) as WeightCategory;
    }

    public getFlightPlanLine(includeRoute: boolean = true): string {
        return `$FP${this.callsign}:*A:${this.rules}:${this.aircraft}:${this.tas}\
:${this.departure}:${this.departureTime}:${this.departureTime}:${this.rfl}\
:${this.arrival}:${this.flightTime.substring(0, 2)}:${this.flightTime.substring(2)}:\
${this.getFuelHours()}:${this.flightTime.substring(2)}:${this.alternate}:${this.getRemarks()}:\
${includeRoute ? this.route : ''}`;
    }

    public getSimDataLine(): string {
        return `SIMDATA:${this.callsign}:*:*:${this.isLight() ? '15' : '20'}:1:0`;
    }
}
