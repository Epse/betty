import {Fault} from "../faulter";
import {FlightPlan} from "../flight_plan";

function isBrussels(flightPlan: FlightPlan): boolean {
    return flightPlan.departure === "EBBR";
}

function routeLevelBadness(arrival: string, route: string, level: string): ((flightPlan: FlightPlan) => FlightPlan) {
    return (flightPlan: FlightPlan): FlightPlan => new FlightPlan(
        flightPlan.callsign,
        flightPlan.rules,
        flightPlan.aircraft,
        flightPlan.departure,
        flightPlan.departureTime,
        route,
        flightPlan.tas,
        level,
        arrival,
        flightPlan.flightTime,
        flightPlan.alternate
    )
}

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

        },
    },
    {
        name: "Wrong LoA: HELEN required for EHAM",
        applicable: isBrussels,
        apply: routeLevelBadness("HELEN", "DENUT", "1400"),
    },
    {
        name: "Wrong LoA: FL210 or below for EDDL, FL230 is filed",
        applicable: isBrussels,
        apply: routeLevelBadness("EDDL", "LNO M170 NVO T857 BIKMU", "2300")
    },
    {
        name: "Wrong LoA: FL190 or below for LFPG, FL390 is filed",
        applicable: isBrussels,
        apply: routeLevelBadness("LFPG", "CIV Y50 MATIX", "3900"),
    },
    {
        name: "Flight level fault: 24000 now filed, 23000 was original",
        applicable: isBrussels,
        apply: routeLevelBadness("EDDF", "SPI T180 NIVNU T847 TUTOV DCT RAMOB UNOKO1A", "2400")
    },
    {
        name: "Wrong LoA: Flights towards EGKK require DENUT - BULAM - TEBRA",
        applicable: isBrussels,
        apply: routeLevelBadness("EGKK", "KOK TEBRA", "2400"),
    },
    {
        name: "Wrong LoA: Flights towards EGKK require DENUT - BULAM - TEBRA",
        applicable: isBrussels,
        apply: routeLevelBadness("EGKK", "DENUT L610 TEBRA", "2400"),
    },
    {
        name: "Wrong LoA: FL240 or below for EGKK, FL260 is filed",
        applicable: isBrussels,
        apply: routeLevelBadness("EGKK", "DENUT BULAM TEBRA", "2600"),
    },
    {
        name: "Wrong Loa: DENUT or HELEN required for flights towards EGTT FIR",
        applicable: isBrussels,
        apply: routeLevelBadness("EGLL", "CIV M617 CMB B3 RINTI L10 LAM", "2500"),
    },
    {
        name: "Flight level fault: 19000 now filed, 20000 or even below required",
        applicable: isBrussels,
        apply: routeLevelBadness("EGGW", "HELEN L179 SASKI L608 LOGAN", "1900"),
    },
    {
        name: "Wrong LoA: Flights towards EHRD require FL140",
        applicable: isBrussels,
        apply: routeLevelBadness("EHRD", "HELEN", "1300")
    },
    {
        name: "Wrong LoA: Flights towards EHAM require FL140 and HELEN",
        applicable: isBrussels,
        apply: routeLevelBadness("EHAM", "DENUT", "1500")
    },
    {
        name: "Wrong LoA: Flights towards EH** require HELEN, but is it?",
        applicable: isBrussels,
        apply: routeLevelBadness("EHBK", "LNO", "10000"),
    },
    {
        name: "Wrong LoA: FL240 or below for EGVN, FL260 is filed",
        applicable: isBrussels,
        apply: routeLevelBadness("EGVN", "HELEN UL179 GILTI L179 LAM DCT CPT L9 SIREN DCT OSGOD", "2600")
    },
] satisfies Fault[];
