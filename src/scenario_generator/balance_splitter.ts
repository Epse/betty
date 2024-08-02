import {BalanceCategories, BalanceCategory, Configuration, TrafficType} from "./types";
import {FlightPlan} from "./flight_plan";
import {firstFix} from "../util/first_fix";
import {TrafficMatcher} from "./traffic_matcher";

export interface BalancedPlan {
    proportion: number,
    flightPlans: FlightPlan[]
}

export class BalanceSplitter {
    public constructor(
        private readonly categories: BalanceCategories
    ) {
    }

    public split(flightPlans: FlightPlan[]): BalancedPlan[] {
        if (!this.categories || Object.keys(this.categories).length === 0) {
            return [{
                proportion: 1.0,
                flightPlans
            }];
        }

        const balanced = this.makeCategories();
        plans: for (const flightPlan of flightPlans) {
            for (const key in balanced) {
                if (key === 'Other')
                    continue;

                if (this.matches(flightPlan, this.categories[key])) {
                    balanced[key].flightPlans.push(flightPlan);
                    continue plans;
                }
            }

            balanced['Other'].flightPlans.push(flightPlan);
        }

        return Object.values(balanced);
    }

    private makeCategories(): { [key: string]: BalancedPlan } {
        const proportion = 1 - Object.values(this.categories)
            .map(x => x.proportion)
            .reduce((prev, current) => prev + current, 0);

        let categories: { [key: string]: BalancedPlan } = {
            'Other': {
                proportion,
                flightPlans: []
            }
        };

        for (const key in this.categories) {
            categories[key] = {
                proportion: this.categories[key].proportion,
                flightPlans: []
            }
        }

        return categories;
    }

    private matches(flightPlan: FlightPlan, category: BalanceCategory): boolean {
        if (category.fixes !== undefined) {
            const initial = firstFix(flightPlan.route);
            for (const fix of category.fixes) {
                if (fix === initial)
                    return true;
            }
        }

        if (category.types === undefined)
            return false; // Didn't match a fix and there's no types, we will never match

        for (const type of category.types) {
            if (TrafficMatcher.checkOneType(flightPlan, type as TrafficType)) {
                return true;
            }
        }

        return false;
    }
}
