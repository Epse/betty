import {FlightPlan} from "./flight_plan";

export abstract class ScheduledFlightPlan {
    public readonly flightPlan: FlightPlan;
    protected position: string;
    public abstract readonly type: string;
    protected start: number;
    protected initialPseudoPilot: string;

    public constructor(flightPlan: FlightPlan) {
        this.flightPlan = flightPlan;
    }

    public setPosition(position: string): this {
        this.position = position;
        return this;
    }

    public setStart(start: number): this {
        this.start = start;
        return this;
    }

    public setInitialPseudoPilot(initialPseudoPilot: string): this {
        this.initialPseudoPilot = initialPseudoPilot;
        return this;
    }

    public getDefinitionLine(): string {
        return `@N:${this.flightPlan.callsign}:${this.flightPlan.squawk}:1:${this.position}:0`;
    }

    public abstract toString(): string;
}

export class DepartureFlightPlan extends ScheduledFlightPlan {
    public readonly type = "DEPARTURE";
    protected reqAlt: string;

    public setReqAlt(reqAlt: string): this {
        this.reqAlt = reqAlt;
        return this;
    }

    public toString(): string {
        return this.getDefinitionLine() + "\n"
            + this.flightPlan.getFlightPlanLine(true) + "\n"
            + this.flightPlan.getSimDataLine() + "\n"
            + `START:${this.start.toFixed(0)}\n`
            + `REQALT:${this.reqAlt}\n`
            + `INITIALPSEUDOPILOT:${this.initialPseudoPilot}\n`
            + "\n";
    }
}

export class ArrivalFlightPlan extends ScheduledFlightPlan {
    public readonly type = "ARRIVAL";
    protected route: string;
    protected reqAlt: string;

    public setReqAlt(reqAlt: string): this {
        this.reqAlt = reqAlt;
        return this;
    }

    public setRoute(route: string): this {
        this.route = route;
        return this;
    }

    public toString(): string {
        return this.getDefinitionLine() + "\n"
            + this.flightPlan.getFlightPlanLine(false) + this.route +  "\n"
            + this.flightPlan.getSimDataLine() + "\n"
            + `START:${this.start.toFixed(0)}\n`
            + `$ROUTE:${this.route}\n`
            + `REQALT:${this.reqAlt}\n`
            + `INITIALPSEUDOPILOT:${this.initialPseudoPilot}\n`
            + "\n";
    }

}
