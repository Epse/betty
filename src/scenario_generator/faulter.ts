import {FlightPlan} from "./flight_plan";
import faults from "./data/faults";
import {shuffleArray} from "../util/shuffle_array";

export interface Fault {
    name: string,
    applicable(flightPlan: FlightPlan): boolean,
    apply(flightPlan: FlightPlan): FlightPlan,
}

/*
Types of faults
- aircraft type
- departure airport switcharood
- RFL up/down 1000
- non-LoA route?
 */
export class Faulter {
    private notes = "; FAULTS\n";

    public getNotes(): string {
        return this.notes;
    }

    public fault(flightPlan: FlightPlan): FlightPlan {
        let shuffled: Fault[] = shuffleArray([...faults]);

        for (const fault of shuffled) {
            if (fault.applicable(flightPlan)) {
                this.notes += `; ${flightPlan.callsign}: ${fault.name}\n`
                return fault.apply(flightPlan);
            }
        }

        return flightPlan;
    }
}
