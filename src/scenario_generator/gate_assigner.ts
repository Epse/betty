import {fetchGates, Gate} from "./data/gates";
import {FlightPlan} from "./flight_plan";
import {ScenarioAirport} from "./types";
import airports from "./data/airports";
import {TrafficMatcher} from "./traffic_matcher";

export class GateAssigner {
    private gates: Gate[] = [];

    public async getGates(): Promise<void> {
        this.gates = await fetchGates();
    }

    public for(airport: ScenarioAirport, flightPlan: FlightPlan): Gate | undefined {
        const aprons: string[] = airports[airport].apronMapping
            .filter(mapping => TrafficMatcher.matches(flightPlan, mapping))
            .at(0)
            .aprons;

        const gates = this.gates
            .filter(gate => gate.airport === airport)
            .filter(gate => aprons.findIndex(x => x === gate.apron) !== -1);

        const index = Math.round(Math.random() * (gates.length - 1));
        return gates[index] ?? gates[0];
    }

}
