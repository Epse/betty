import {ScenarioAirport} from "../types";

export default {
    'EBOS': '7.0',
    'EBCI': '606.0',
    'EBAW': '32.0',
    'EBBR': '175.0',
    'EBLG': '651.0',
    'ELLX': '1234.0'
} satisfies {[key in ScenarioAirport]: string}
