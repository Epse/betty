import {fetchGates, Gate} from "./data/gates";
import {FlightPlan} from "./flight_plan";
import {ApronMapping, ScenarioAirport, TrafficType} from "./types";
import airports from "./data/airports";

export class GateAssigner {
    private gates: Gate[] = [];

    public readonly schengen = ["BI", "EB", "ED", "EE", "EF", "EH", "EK", "EL", "EN", "EP", "ES", "EV", "EY",
        "GC", "LD", "LE", "LF", "LG", "LH", "LI", "LJ", "LK", "LM", "LO", "LP", "LS", "LZ"];
    public readonly cargoIcao = ["ACP", "ABD", "ABR", "ABW", "AFX", "AHK", "AIC", "AZG", "BBD", "BCS", "BGA",
        "BOX", "CJT", "CKK", "CKS", "CLU", "CLX", "CTJ", "DAE", "DHK", "DHL", "DSR", "EIA", "EUF", "FDX", "FRH", "GEC",
        "GSS", "GTI", "ICL", "ICV", "LAE", "LAP", "LCO", "LTG", "MAS", "MCA", "MPH", "MSX", "MZN", "NCA", "NPT",
        "NWA", "PAC", "QAC", "RCF", "SHQ", "SQC", "SWN", "TAY", "UPS", "WGN", "WLF", "XSC", "ABX"];
    public readonly lowCostIcao = ["EJU", "EZS", "EZY", "LDA", "LDM", "MAY", "RUK", "RYR", "RYS", "WZZ", "TRA"];

    public async getGates(): Promise<void> {
        this.gates = await fetchGates();
    }

    public for(airport: ScenarioAirport, flightPlan: FlightPlan): Gate | undefined {
        const aprons: string[] = airports[airport].apronMapping
            .filter(mapping => this.matches(flightPlan, mapping))
            .at(0)
            .aprons;

        const gates = this.gates
            .filter(gate => gate.airport === airport)
            .filter(gate => aprons.findIndex(x => x === gate.apron) !== -1);

        const index = Math.round(Math.random() * (gates.length - 1));
        return gates[index] ?? gates[0];
    }

    private isSchengen(flightPlan: FlightPlan): boolean {
        const matchPrefix = (icao: string): boolean =>
            this.schengen.findIndex(x => x === icao.substring(0, 2)) !== -1;
        return matchPrefix(flightPlan.departure) && matchPrefix(flightPlan.arrival);
    }

    private checkOneType(flightPlan: FlightPlan, type: TrafficType): boolean {
        switch (type) {
            case "Light":
                return flightPlan.weightCategory() === "L";
            case "Medium":
                return flightPlan.weightCategory() === "M";
            case "Heavy":
                return flightPlan.weightCategory() === "H" || flightPlan.weightCategory() === "J";
            case "Cargo":
                return this.cargoIcao.findIndex(x => x === flightPlan.callsign.substring(0, 3)) !== -1;
            case "LowCost":
                return this.lowCostIcao.findIndex(x => x === flightPlan.callsign.substring(0, 3)) !== -1;
            case "Military":
                return false; // Not implemented
            case "NonSchengen":
                return !this.isSchengen(flightPlan);
            case "Schengen":
                return this.isSchengen(flightPlan);
        }
    }

    private matches(flightPlan: FlightPlan, mapping: ApronMapping): boolean {
        return mapping
            .types
            .reduce((previous, current) =>
                previous && this.checkOneType(flightPlan, current), true);
    }
}
