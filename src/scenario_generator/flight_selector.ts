import {Configuration, ScenarioAirport, TrafficCounts} from "./types";
import {FlightPlan} from "./flight_plan";
import {ArrivalFlightPlan, DepartureFlightPlan, ScheduledFlightPlan} from "./scheduled_flight_plan";
import airports from "./data/airports";
import {GateAssigner} from "./gate_assigner";
import {makeAVFR} from "./make_a_vfr";
import {Faulter} from "./faulter";
import {shuffleArray} from "../util/shuffle_array";

export class FlightSelector {
    private readonly flightPlans: FlightPlan[];
    private selected: ScheduledFlightPlan[] = [];
    public readonly duration = 60; // 60 minutes
    private readonly currentConfiguration: Configuration;
    private gates: GateAssigner;
    private faulter = new Faulter();

    public constructor(public readonly initialPseudoPilot: string,
                       public readonly airport: ScenarioAirport,
                       public readonly configuration: string,
                       public readonly desired: TrafficCounts,
                       flightPlans: string[]) {
        this.flightPlans = shuffleArray(flightPlans.map(x => FlightPlan.fromEntry(x)));
        this.currentConfiguration = airports[this.airport]?.configurations[this.configuration] ?? null;
        if (this.currentConfiguration === null || this.currentConfiguration === undefined) {
            throw new Error("Bad configuration");
        }

        this.gates = new GateAssigner();
    }

    public async setup(): Promise<this> {
        await this.gates.getGates();
        return this;
    }

    /**
     * Selects the desired flight plans and returns their text blocks
     */
    public select(): this {
        return this.selectInitial()
            .selectIfrDepartures()
            .selectIfrArrivals()
            .selectVfrDepartures()
            .selectVfrArrivals();
    }

    public toString(): string {
        return this.faulter.getNotes() + "\n"
            + this.selected
                .map(x => x.toString())
                .join("\n");
    }

    private selectInitial(): this {
        let toBeAdded: ScheduledFlightPlan[] = [];
        const departures = this.flightPlans
            .filter(x => x.departure == this.airport)
            .filter(x => x.rules === "I")
        ;

        const faultCount = Math.round(
            this.desired.faults / (this.desired.initial + this.desired.ifrDepartures) * this.desired.initial);
        // In theory this could generate only one actual fault, who cares
        let faults = new Array(this.desired.initial).map(_x => false);
        for (let i = 0; i < faultCount; i++) {
            const idx = Math.round(Math.random() * (faults.length - 1));
            faults[idx] = true;
        }

        for (let x = 0; x < this.desired.initial; x++) {
            toBeAdded.push(
                new DepartureFlightPlan(
                    faults[x] ? this.faulter.fault(departures[x]) : departures[x]
                )
                    .setStart(0)
                    .setInitialPseudoPilot(this.initialPseudoPilot)
                    .setPosition(this.gates.for(this.airport, departures[x]).toLocationString())
            );
        }

        this.selected.push(...toBeAdded);
        return this;
    }

    private selectIfrDepartures(): this {
        // Divide the duration by 1 more than the amount of departures, to leave space for initial
        const interval = Math.round(this.duration / (this.desired.ifrDepartures) + 1);
        let toBeAdded: ScheduledFlightPlan[] = [];

        const faultCount = Math.round(
            this.desired.faults / (this.desired.initial + this.desired.ifrDepartures) * this.desired.ifrDepartures);
        // In theory this could generate only one actual fault, who cares
        let faults = new Array(this.desired.ifrDepartures).map(_x => false);
        for (let i = 0; i < faultCount; i++) {
            const idx = Math.round(Math.random() * (faults.length - 1));
            faults[idx] = true;
        }

        const departures = this.flightPlans
            .filter(x => x.departure == this.airport)
            .filter(x => x.rules === "I")
        ;

        for (let x = 0; x < this.desired.ifrDepartures; x++) {
            toBeAdded.push(
                new DepartureFlightPlan(
                    faults[x] ? this.faulter.fault(departures[x]) : departures[x]
                )
                    .setStart((x + 1) * interval)
                    .setInitialPseudoPilot(this.initialPseudoPilot)
                    .setPosition(this.gates.for(this.airport, departures[x]).toLocationString())
            );
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

            toBeAdded.push(
                new ArrivalFlightPlan(arrivals[x])
                    .setStart(x * interval)
                    .setInitialPseudoPilot(this.initialPseudoPilot)
                    .setRoute(arrival.route)
                    .setRoute(arrival.reqAlt)
                    .setPosition(arrival.spawn)
            );
        }

        this.selected.push(...toBeAdded);
        return this;
    }

    private selectVfrDepartures(): this {
        const interval = Math.round(this.duration / this.desired.vfrDepartures);
        let toBeAdded: ScheduledFlightPlan[] = [];
        const departures = this.flightPlans
            .filter(x => x.departure == this.airport)
            .filter(x => x.rules === "V")
        ;

        while (departures.length < this.desired.vfrDepartures) {
            departures.push(makeAVFR(this.airport, true));
        }

        for (let x = 0; x < this.desired.vfrDepartures; x++) {
            toBeAdded.push(
                new DepartureFlightPlan(departures[x])
                    .setStart((x + 1) * interval)
                    .setInitialPseudoPilot(this.initialPseudoPilot)
                    .setPosition(this.gates.for(this.airport, departures[x]).toLocationString())
            );
        }
        this.selected.push(...toBeAdded);
        return this;
    }

    private selectVfrArrivals(): this {
        const interval = Math.round(this.duration / this.desired.vfrArrivals);
        let toBeAdded: ScheduledFlightPlan[] = [];
        const arrivals = this.flightPlans
            .filter(x => x.arrival == this.airport)
            .filter(x => x.rules == "V")
        ;

        while (arrivals.length < this.desired.vfrArrivals) {
            arrivals.push(makeAVFR(this.airport, false));
        }

        for (let x = 0; x < this.desired.vfrArrivals; x++) {
            const arrivalIndex = Math.round(Math.random() * (this.currentConfiguration.routes.vfr.length - 1));
            const arrival = this.currentConfiguration.routes.vfr[arrivalIndex];

            toBeAdded.push(
                new ArrivalFlightPlan(arrivals[x])
                    .setStart(x * interval)
                    .setInitialPseudoPilot(this.initialPseudoPilot)
                    .setRoute(arrival.route)
                    .setRoute(arrival.reqAlt)
                    .setPosition(arrival.spawn)
            );
        }

        this.selected.push(...toBeAdded);
        return this;
    }
}
