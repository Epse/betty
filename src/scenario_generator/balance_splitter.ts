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
        if (Object.keys(this.categories).length === 0) {
            return [{
                proportion: 1.0,
                flightPlans
            }];
        }

        const categories = this.makeCategories();

        for (const flightPlan of flightPlans) {
            for (const category of categories) {
                if (this.matches(flightPlan, category)) {
                    category.flightPlans.push(flightPlan)
                    break;
                }
            }
            categories[0].flightPlans.push(flightPlan); // Always the Other category
        }

        return categories;
    }

    private makeCategories(): BalancedPlan[] {
        const proportion = 1 - Object.values(this.categories)
            .map(x => x.proportion)
            .reduce((prev, current) => prev + current, 0);

        let categories: BalancedPlan[] =  [{
            proportion,
            flightPlans: []
        }];

        categories.push(...Object.values(this.categories).map(x => ({
            proportion: x.proportion,
            flightPlans: []
        })));

        return categories;
    }

    private matches(flightPlan: FlightPlan, category: BalanceCategory): boolean {
        if (category.fixes !== undefined) {
            const initial = firstFix(flightPlan.route);
            for (const fix in category.fixes) {
                if (fix === initial)
                    return true;
            }
        }

        if (category.types === undefined)
            return false; // Didn't match a fix and there's no types, we will never match

        for (const type in category.types) {
            if (TrafficMatcher.checkOneType(flightPlan, type as TrafficType)) {
                return true;
            }
        }

        return false;
    }
}
