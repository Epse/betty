import {Fault} from "../faulter";
import {FlightPlan} from "../flight_plan";

export default [
    {
        name: 'Aircraft Type',
        applicable(_flightPlan: FlightPlan): boolean {
            return true;
        },
        apply(flightPlan: FlightPlan): FlightPlan {
            const choices = ['P', 'Q', 'U', 'V', 'X', 'Z'];
            const idx = Math.round(Math.random() * (choices.length - 1));
            flightPlan.aircraft = choices[idx] + flightPlan.aircraft.substring(1);
            return flightPlan;
        }
    },
    {
        name: 'Departure',
        applicable(_flightPlan: FlightPlan): boolean {
            return true;
        },
        apply(flightPlan: FlightPlan): FlightPlan {
            flightPlan.departure = 'FOOK';
            return flightPlan;

        }
    }
] satisfies Fault[];
