import {FlightPlan} from "./flight_plan";
import {ApronMapping, TrafficType} from "./types";
import data from "./data/data.json";

export class TrafficMatcher {

    public static isSchengen(flightPlan: FlightPlan): boolean {
        const matchPrefix = (icao: string): boolean =>
            data['ap_shengen'].findIndex(x => x === icao.substring(0, 2)) !== -1;
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
                return data['cs_cargo'].findIndex(x => x === flightPlan.callsign.substring(0, 3)) !== -1;
            case "LowCost":
                return data['cs_low_cost'].findIndex(x => x === flightPlan.callsign.substring(0, 3)) !== -1;
            case "Military":
                return data['cs_MIL'].findIndex(x => flightPlan.callsign.startsWith(x)) !== -1;
            case "NonSchengen":
                return !this.isSchengen(flightPlan);
            case "Schengen":
                return this.isSchengen(flightPlan);
            case "GA":
                return data['ac_GA'].findIndex(x => flightPlan.aircraft.startsWith(x)) !== -1;
            case "Private":
                return data['ac_privatejets'].findIndex(x => flightPlan.aircraft.startsWith(x)) !== -1;
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
