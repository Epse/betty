import {Configuration} from "./types";
import {BalanceSplitter} from "./balance_splitter";
import {FlightPlan} from "./flight_plan";

const configuration: Configuration = {
    "approaches": [
        "ILS25L:50.8988090:4.5226183:50.8897673:4.4832953",
        "ILS25R:50.9119346:4.5007661:50.8989236:4.4560247",
        "ILS19:50.9113969:4.5013690:50.8869201:4.4915758",
    ],
    "routeFiles": ["routesEBBR1925R.txt",],
    routes: {
        vfr: [], ifr: [],
    },
    departureBalanceCategories: {
        "25R": {
            types: ["GA", "Heavy", "Military"],
            fixes: ["ELSIK", "NIK", "HELEN", "DENUT", "KOK", "CIV"],
            proportion: 0.5, // 50% goes to 25R, 50% to 19
        },
        // No category for 19, that receives the "Other" group
    }
};

function mockPlan(initialFix: string, type: string): FlightPlan {
    return new FlightPlan(
        Math.round(Math.random() * 1000).toFixed(0),
        "I",
        type,
        "EBBR",
        "",
        initialFix,
        "",
        "",
        "KSUS",
        "",
        ""
    );
}

test('it puts things in Other sometimes', () => {
    const splitter = new BalanceSplitter(configuration.departureBalanceCategories);
    const split = splitter.split([
        mockPlan('ROUSY', 'A20N/M'),
        mockPlan('KOK', 'A20N/M'),
        mockPlan('SOPOK', 'B777/H'),
    ]);

    // Other usually comes first
    expect(split[0].flightPlans.length).toBe(1);
    expect(split[1].flightPlans.length).toBe(2);
});
