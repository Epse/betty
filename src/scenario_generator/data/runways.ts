import {ScenarioAirport} from "../types";

export default {
    'EBBR': [ '25S', '07S', '19', '01', '2519DEP25RARR', '07DEP01ARR', '25RDEP25LARR' ],
    'EBOS': ['08', '26'],
    'EBCI': ['06', '24'],
    'EBAW': ['11', '29'],
    'EBLG': ['04R', '22L'],
    'ELLX': ['06', '24']
} satisfies {[key in ScenarioAirport]: string[]}
