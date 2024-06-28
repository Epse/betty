import {ScenarioAirport} from "./types";
import {FlightPlan} from "./flight_plan";
import airports from "./data/airports";


const vfrCallsigns = ["OOAWT", "OOBET", "OOVCG", "OOVCK", "OOVCL", "OOVCM", "OOVCR", "OOVCW", "OOILS", "OOVFR", "OOVMA",
    "OOVMC", "OOVMD", "OOVMX", "OOVMY", "OONZV", "OOKOK", "PHDYX", "OOJBO", "OOCFC", "OORAQ", "OOLVC",
    "OOJCM", "OOSAG", "OOSST", "OOSKV", "OOALE"];
const vfrTypes = ["C172", "C152", "C152", "C152", "C152", "C152", "C152", "C172", "P28R", "P28R", "P28R", "P28R", "P28R",
    "PA28", "P28R", "DR40", "DV20", "DR40", "HR20", "PA38", "C172", "C152", "P28A", "P28A", "AC11", "DR40",
    "C172"]
const vfrAirports = ["EBAM", "EBAW", "EBKH", "EBBT", "EBBR", "EBCF", "EBCI", "EBDT", "EBZW", "EBGG", "EBTN", "EBGB", "EBZH",
    "EBHN", "EBEH", "EBFN", "EBLE", "EBLG", "ELLX", "EBMO", "EBNM", "ELNT", "EBOS", "EBSG", "EBSH", "EBST",
    "EBSP", "EBTY", "EBUL", "ELUS", "EBTX", "EBWE", "EBZR", "EBSL"]

function randomFrom<T>(arr: T[]): T {
    const index = Math.round(Math.random() * (arr.length - 1));
    return arr[index];
}

export function makeAVFR(airport: ScenarioAirport, departure: boolean): FlightPlan {
    return new FlightPlan(
        randomFrom(vfrCallsigns),
        "V",
        randomFrom(vfrTypes) + "/L",
        departure ? airport : randomFrom(vfrAirports),
        "0000",
        "",
        "120",
        airports[airport].departureAltitude,
        departure ? randomFrom(vfrAirports) : airport,
        "0000",
        randomFrom(vfrAirports)
    );
}
