import {ScenarioAirport} from "../types";

export default {
    'EBBR': '6000',
    'EBOS': '6000',
    'EBCI': '4000',
    'EBAW': '3000',
    'EBLG': '5000',
    'ELLX': '4000'
} satisfies {[key in ScenarioAirport]: string}
