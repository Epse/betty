import {Configuration, ScenarioAirport, TrafficCounts} from "./types";
import {FlightPlan} from "./flight_plan";
import {ArrivalFlightPlan, DepartureFlightPlan, ScheduledFlightPlan} from "./scheduled_flight_plan";
import airports from "./data/airports";
import {GateAssigner} from "./gate_assigner";
import {makeAVFR} from "./make_a_vfr";
import {Faulter} from "./faulter";
import {shuffleArray} from "../util/shuffle_array";
import {TrafficMatcher} from "./traffic_matcher";
import {BalanceSplitter} from "./balance_splitter";

export class FlightSelector {
    private readonly flightPlans: FlightPlan[];
    private selected: ScheduledFlightPlan[] = [];
    public readonly duration = 60; // 60 minutes
    private readonly currentConfiguration: Configuration;
    private gates: GateAssigner;
    private faulter = new Faulter();
    private readonly splitter: BalanceSplitter;

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
        this.splitter = new BalanceSplitter(this.currentConfiguration.departureBalanceCategories);
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

    private availableFlightPlans(): FlightPlan[] {
        return this.flightPlans
            .filter(fp =>
                this.selected.findIndex(x => x.flightPlan.callsign === fp.callsign) == -1);
    }

    private selectInitial(): this {
        const departures = this.availableFlightPlans()
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

        const split = this.splitter.split(departures);
        const toBeAdded = split
            .flatMap(balance => balance.flightPlans.slice(0, Math.round(this.desired.initial * balance.proportion)))
            .map((val, idx) => faults[idx] ? this.faulter.fault(val) : val)
            .map(plan => new DepartureFlightPlan(plan)
                .setStart(0)
                .setReqAlt("EBBR:" + airports[this.airport].departureAltitude)
                .setInitialPseudoPilot(this.initialPseudoPilot)
                .setPosition(this.gates.for(this.airport, plan).toLocationString())
            );

        this.selected.push(...shuffleArray(toBeAdded)); // They all start at 0, so this is fine
        return this;
    }

    private selectIfrDepartures(): this {
        // Divide the duration by 1 more than the amount of departures, to leave space for initial
        const interval = Math.round(this.duration / (this.desired.ifrDepartures + 1));

        const faultCount = Math.round(
            this.desired.faults / (this.desired.initial + this.desired.ifrDepartures) * this.desired.ifrDepartures);
        // In theory this could generate only one actual fault, who cares
        let faults = new Array(this.desired.ifrDepartures).map(_x => false);
        for (let i = 0; i < faultCount; i++) {
            const idx = Math.round(Math.random() * (faults.length - 1));
            faults[idx] = true;
        }

        const departures = this.availableFlightPlans()
            .filter(x => x.departure == this.airport)
            .filter(x => x.rules === "I")
        ;

        const split = this.splitter.split(departures);
        // Shuffle after merging the categories, before the faulting
        const toBeAdded = shuffleArray(split
            .flatMap(balance =>
                balance.flightPlans.slice(0, Math.round(this.desired.ifrDepartures * balance.proportion))))
            .map((val, idx) => faults[idx] ? this.faulter.fault(val) : val)
            .map((plan, idx) => new DepartureFlightPlan(plan)
                .setStart((idx + 1) * interval)
                .setReqAlt("EBBR:" + airports[this.airport].departureAltitude)
                .setInitialPseudoPilot(this.initialPseudoPilot)
                .setPosition(this.gates.for(this.airport, plan).toLocationString())
            );

        this.selected.push(...toBeAdded);
        return this;
    }

    private selectIfrArrivals(): this {
        // No +1 to make sure they start right away
        const interval = Math.round(this.duration / this.desired.ifrArrivals);
        let toBeAdded: ScheduledFlightPlan[] = [];
        const arrivals = this.availableFlightPlans()
            .filter(x => x.arrival == this.airport)
            .filter(x => x.rules == "I")
        ;
        for (let x = 0; x < this.desired.ifrArrivals; x++) {
            const plan = arrivals[x];

            let candidateRoutes = this.currentConfiguration.routes.ifr
                .filter(route => route.deny === undefined || !TrafficMatcher.matchesAll(plan, route.deny))
                .filter(route => route.only === undefined || TrafficMatcher.matchesAll(plan, route.only));

            const arrivalIndex = Math.round(Math.random() * (candidateRoutes.length - 1));
            const arrival = candidateRoutes[arrivalIndex];

            toBeAdded.push(
                new ArrivalFlightPlan(plan)
                    .setStart(x * interval)
                    .setInitialPseudoPilot(this.initialPseudoPilot)
                    .setRoute(arrival.route)
                    .setReqAlt(arrival.reqAlt)
                    .setPosition(arrival.spawn)
            );
        }

        this.selected.push(...toBeAdded);
        return this;
    }

    private selectVfrDepartures(): this {
        const interval = Math.round(this.duration / this.desired.vfrDepartures);
        let toBeAdded: ScheduledFlightPlan[] = [];
        const departures = this.availableFlightPlans()
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
                    .setReqAlt(this.currentConfiguration.routes.vfr[0].reqAlt)
            );
        }
        this.selected.push(...toBeAdded);
        return this;
    }

    private selectVfrArrivals(): this {
        const interval = Math.round(this.duration / this.desired.vfrArrivals);
        let toBeAdded: ScheduledFlightPlan[] = [];
        const arrivals = this.availableFlightPlans()
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
                    .setReqAlt(arrival.reqAlt)
                    .setPosition(arrival.spawn)
            );
        }

        this.selected.push(...toBeAdded);
        return this;
    }
}
