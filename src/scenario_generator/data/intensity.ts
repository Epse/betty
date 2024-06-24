import {ScenarioAirport, ScenarioIntensity, TrafficCounts} from "../types";

export default {
    "EBBR": {
        "LOW": {
            "starts": 2,
            "ifrDepartures": 11,
            "ifrArrivals": 11,
            "vfrDepartures": 2,
            "vfrArrivals": 3,
            "faults": 3
        },
        "MEDIUM": {
            "starts": 4,
            "ifrDepartures": 18,
            "ifrArrivals": 17,
            "vfrDepartures": 3,
            "vfrArrivals": 4,
            "faults": 5
        },
        "HIGH": {
            "starts": 5,
            "ifrDepartures": 25,
            "ifrArrivals": 24,
            "vfrDepartures": 4,
            "vfrArrivals": 6,
            "faults": 6
        }
    },
    "ELLX": {
        "LOW": {
            "starts": 2,
            "ifrDepartures": 8,
            "ifrArrivals": 8,
            "vfrDepartures": 1,
            "vfrArrivals": 1,
            "faults": 2
        },
        "MEDIUM": {
            "starts": 2,
            "ifrDepartures": 12,
            "ifrArrivals": 12,
            "vfrDepartures": 2,
            "vfrArrivals": 2,
            "faults": 3
        },
        "HIGH": {
            "starts": 3,
            "ifrDepartures": 17,
            "ifrArrivals": 17,
            "vfrDepartures": 3,
            "vfrArrivals": 3,
            "faults": 4
        }
    },
    "EBOS": {
        "LOW": {
            "starts": 1,
            "ifrDepartures": 7,
            "ifrArrivals": 6,
            "vfrDepartures": 3,
            "vfrArrivals": 3,
            "faults": 2
        },
        "MEDIUM": {
            "starts": 2,
            "ifrDepartures": 11,
            "ifrArrivals": 10,
            "vfrDepartures": 5,
            "vfrArrivals": 5,
            "faults": 3
        },
        "HIGH": {
            "starts": 3,
            "ifrDepartures": 15,
            "ifrArrivals": 14,
            "vfrDepartures": 7,
            "vfrArrivals": 7,
            "faults": 4
        }
    },
    "EBAW": {
        "LOW": {
            "starts": 2,
            "ifrDepartures": 8,
            "ifrArrivals": 8,
            "vfrDepartures": 4,
            "vfrArrivals": 3,
            "faults": 2
        },
        "MEDIUM": {
            "starts": 3,
            "ifrDepartures": 13,
            "ifrArrivals": 12,
            "vfrDepartures": 6,
            "vfrArrivals": 5,
            "faults": 3
        },
        "HIGH": {
            "starts": 4,
            "ifrDepartures": 18,
            "ifrArrivals": 17,
            "vfrDepartures": 8,
            "vfrArrivals": 7,
            "faults": 5
        }
    },
    "EBCI": {
        "LOW": {
            "starts": 1,
            "ifrDepartures": 7,
            "ifrArrivals": 6,
            "vfrDepartures": 3,
            "vfrArrivals": 3,
            "faults": 2
        },
        "MEDIUM": {
            "starts": 2,
            "ifrDepartures": 11,
            "ifrArrivals": 10,
            "vfrDepartures": 7,
            "vfrArrivals": 7,
            "faults": 4
        },
        "HIGH": {
            "starts": 3,
            "ifrDepartures": 15,
            "ifrArrivals": 14,
            "vfrDepartures": 7,
            "vfrArrivals": 7,
            "faults": 4
        }
    },
    "EBLG": {
        "LOW": {
            "starts": 2,
            "ifrDepartures": 8,
            "ifrArrivals": 8,
            "vfrDepartures": 3,
            "vfrArrivals": 3,
            "faults": 2
        },
        "MEDIUM": {
            "starts": 3,
            "ifrDepartures": 14,
            "ifrArrivals": 12,
            "vfrDepartures": 5,
            "vfrArrivals": 5,
            "faults": 4
        },
        "HIGH": {
            "starts": 4,
            "ifrDepartures": 20,
            "ifrArrivals": 17,
            "vfrDepartures": 7,
            "vfrArrivals": 7,
            "faults": 5
        }
    },
} satisfies {[key in ScenarioAirport]: {[key in "LOW" | "MEDIUM" | "HIGH"]: TrafficCounts}}
