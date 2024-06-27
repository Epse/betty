import {Configuration, ScenarioAirport, TrafficCounts} from "./types";
import {FlightPlan} from "./flight_plan";
import {ArrivalFlightPlan, DepartureFlightPlan, ScheduledFlightPlan} from "./scheduled_flight_plan";
import airports from "./data/airports";

/**
 * Performs an in-place Fischer-Yates shuffle on the provided array,
 * returning a reference to that same array.
 *
 * Make copies at your own peril if so required.
 * @param array
 */
function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export class FlightSelector {
    private readonly flightPlans: FlightPlan[];
    private selected: ScheduledFlightPlan[];
    public readonly duration = 60; // 60 minutes
    private readonly currentConfiguration: Configuration;

    public constructor(public readonly initialPseudoPilot: string,
                       public readonly airport: ScenarioAirport,
                       public readonly configuration: string,
                       public readonly desired: TrafficCounts,
                       flightPlans: string[]) {
        this.flightPlans = shuffleArray(flightPlans.map(x => new FlightPlan(x)));
        this.currentConfiguration = airports[this.airport]?.configurations?[this.configuration] ?? null;
        if (this.currentConfiguration === null) {
            throw new Error("Bad configuration");
        }
    }

    /**
     * Selects the desired flight plans and returns their text blocks
     */
    public select(): this {
        return this.selectInitial()
            .selectIfrDepartures()
            .selectIfrArrivals();
    }

    public generateFaults(): this {
        // TODO
    }

    public get(): ScheduledFlightPlan[] {
        return this.selected;
    }

    public toString(): string {
        return this.selected
            .map(x => x.toString())
            .join("\n");
    }

    private selectInitial(): this {
        let toBeAdded: ScheduledFlightPlan[] = [];
        const departures = this.flightPlans
            .filter(x => x.departure == this.airport)
            .filter(x => x.rules === "I")
        ;

        for (let x = 0; x < this.desired.initial; x++) {
            toBeAdded.push(
                new DepartureFlightPlan(departures[x])
                    .setStart(0)
                    .setInitialPseudoPilot(this.initialPseudoPilot)
                    .setPosition(); // TODO pull from gate api, probably
        )
            ;
        }

        this.selected.push(...toBeAdded);
        return this;
    }

    private selectIfrDepartures(): this {
        // Divide the duration by 1 more than the amount of departures, to leave space for initial
        const interval = Math.round(this.duration / (this.desired.ifrDepartures) + 1);
        let toBeAdded: ScheduledFlightPlan[] = [];
        const departures = this.flightPlans
            .filter(x => x.departure == this.airport)
            .filter(x => x.rules === "I")
        ;

        for (let x = 0; x < this.desired.ifrDepartures; x++) {
            toBeAdded.push(
                new DepartureFlightPlan(departures[x])
                    .setStart((x + 1) * interval)
                    .setInitialPseudoPilot(this.initialPseudoPilot)
                    .setPosition(); // TODO
        )
        }
        this.selected.push(...toBeAdded);
        return this;
    }

    private selectIfrArrivals(): this {
        // No +1 to make sure they start right away
        const interval = Math.round(this.duration / this.desired.ifrArrivals);
        let toBeAdded: ScheduledFlightPlan[] = [];
        const arrivals = this.flightPlans
            .filter(x => x.arrival == this.airport)
            .filter(x => x.rules == "I")
        ;

        for (let x = 0; x < this.desired.ifrArrivals; x++) {
            const arrivalIndex = Math.round(Math.random() * (this.currentConfiguration.routes.ifr.length - 1));
            const arrival = this.currentConfiguration.routes.ifr[arrivalIndex];

            new ArrivalFlightPlan(arrivals[x])
                .setStart(x * interval)
                .setInitialPseudoPilot(this.initialPseudoPilot)
                .setRoute(arrival.route)
                .setRoute(arrival.reqAlt)
                .setPosition(arrival.spawn);
        }
    }
}
