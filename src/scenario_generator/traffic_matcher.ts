import {FlightPlan} from "./flight_plan";
import {ApronMapping, TrafficType} from "./types";

export class TrafficMatcher {
    public static readonly schengen = ["BI", "EB", "ED", "EE", "EF", "EH", "EK", "EL", "EN", "EP", "ES", "EV", "EY",
        "GC", "LD", "LE", "LF", "LG", "LH", "LI", "LJ", "LK", "LM", "LO", "LP", "LS", "LZ"];
    public static readonly cargoIcao = ["ACP", "ABD", "ABR", "ABW", "AFX", "AHK", "AIC", "AZG", "BBD", "BCS", "BGA",
        "BOX", "CJT", "CKK", "CKS", "CLU", "CLX", "CTJ", "DAE", "DHK", "DHL", "DSR", "EIA", "EUF", "FDX", "FRH", "GEC",
        "GSS", "GTI", "ICL", "ICV", "LAE", "LAP", "LCO", "LTG", "MAS", "MCA", "MPH", "MSX", "MZN", "NCA", "NPT",
        "NWA", "PAC", "QAC", "RCF", "SHQ", "SQC", "SWN", "TAY", "UPS", "WGN", "WLF", "XSC", "ABX"];
    public static readonly lowCostIcao = ["EJU", "EZS", "EZY", "LDA", "LDM", "MAY", "RUK", "RYR", "RYS", "WZZ", "TRA"];

    public static isSchengen(flightPlan: FlightPlan): boolean {
        const matchPrefix = (icao: string): boolean =>
            this.schengen.findIndex(x => x === icao.substring(0, 2)) !== -1;
        return matchPrefix(flightPlan.departure) && matchPrefix(flightPlan.arrival);
    }

    public static checkOneType(flightPlan: FlightPlan, type: TrafficType): boolean {
        switch (type) {
            case "Light":
                return flightPlan.weightCategory() === "L";
            case "Medium":
                return flightPlan.weightCategory() === "M";
            case "Heavy":
                return flightPlan.weightCategory() === "H" || flightPlan.weightCategory() === "J";
            case "Cargo":
                return TrafficMatcher.cargoIcao.findIndex(x => x === flightPlan.callsign.substring(0, 3)) !== -1;
            case "LowCost":
                return TrafficMatcher.lowCostIcao.findIndex(x => x === flightPlan.callsign.substring(0, 3)) !== -1;
            case "Military":
                return false; // Not implemented
            case "NonSchengen":
                return !this.isSchengen(flightPlan);
            case "Schengen":
                return this.isSchengen(flightPlan);
        }
    }

    public static matches(flightPlan: FlightPlan, mapping: ApronMapping): boolean {
        return mapping
            .types
            .reduce((previous, current) =>
                previous && this.checkOneType(flightPlan, current), true);
    }

    public static matchesAll(flightPlan: FlightPlan, rules: TrafficType[][]): boolean {
        return rules
            .reduce((allowed, ruleSet) =>
                allowed || ruleSet.reduce((m, rule) =>
                    this.checkOneType(flightPlan, rule) && m, true),
                false);
    }
}
