import {AirportData, ScenarioAirport} from "../types";

export default {
    "EBBR": {
        "atcGroup": "atcBRApp",
        "departureAltitude": "6000",
        "elevation": "175.0",
        "configurations": {
            "25S": {
                "approaches": [
                    "ILS25L:50.8988090:4.5226183:50.8897673:4.4832953",
                    "ILS25R:50.9125335:4.5025848:50.8990607:4.4563412",
                ],
                "routeFiles": ["routesEBBR25s.txt",],
            },
            "07S": {
                "approaches": [
                    "ILS07L: 50.8989561:4.4559023: 50.9127120:4.5031361",
                    "ILS07R:50.8898451:4.4842205:50.8989886:4.5233715",
                ],
                "routeFiles": ["routesEBBR07s.txt",],
            },
            "19": {
                "approaches": [
                    "ILS25R:50.9119346:4.5007661:50.8989236:4.4560247",
                    "ILS19:50.9118475:4.5016226:50.8875164:4.4917777",
                ],
                "routeFiles": ["routesEBBR19.txt"],
            },
            "01": {
                "approaches": [
                    "ILS07R:50.8898451:4.4842205:50.8989886:4.5233715",
                    "ILS01:50.8870045:4.4916250:50.9122126:4.5016366",
                ],
                "routeFiles": ["routesEBBR01.txt"],
            },
            "2519DEP25RARR": {
                "approaches": [
                    "ILS25L:50.8988090:4.5226183:50.8897673:4.4832953",
                    "ILS25R:50.9119346:4.5007661:50.8989236:4.4560247",
                    "ILS19:50.9113969:4.5013690:50.8869201:4.4915758",
                ],
                "routeFiles": ["routesEBBR1925R.txt",],
            },
            "07DEP01ARR": {
                "approaches": [
                    "ILS07L:50.8989561:4.4559023:50.9127120:4.5031361",
                    "ILS07R:50.8898451:4.4842205:50.8989886:4.5233715",
                    "ILS01:50.8870045:4.4916250:50.9122126:4.5016366",
                ],
                "routeFiles": [
                    "routesEBBR01.txt",
                    "routesEBBR07s.txt",
                ]
            },
            "25RDEP25LARR": {
                "approaches": [
                    "ILS25L:50.8988090:4.5226183:50.8897673:4.4832953",
                    "ILS25R:50.9125335:4.5025848:50.8990607:4.4563412",
                ],
                "routeFiles": ["routesEBBR25s.txt",],
            },
        },
        "intensity": {
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
        }
    },
    "ELLX": {
        "atcGroup": "atcLXApp",
        "elevation": "1234.0",
        "departureAltitude": "4000",
        "configurations": {
            "06": {
                "approaches": [
                    "ILS06:49.6174735:6.1876052:49.6355411:6.2361562",
                    "ILS24:49.6355441:6.2360036:49.6175949:6.1876900",
                ],
                "routeFiles": ["routesELLX06.txt",],
            },
            "24": {
                "approaches": [
                    "ILS06:49.6174735:6.1876052:49.6355411:6.2361562",
                    "ILS24:49.6355441:6.2360036:49.6175949:6.1876900",
                ],
                "routeFiles": ["routesELLX24.txt",],
            },
        },
        "intensity": {
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
        }
    },
    "EBOS": {
        "atcGroup": "atcLow",
        "configurations": {
            "26": {
                "approaches": ["ILS26:51.2023081:2.8909895:51.1972448:2.8575650"],
                "routeFiles": ["routesEBOS26.txt",],
            },
            "08": {
                "approaches": ["ILS08:51.1972448:2.8575650:51.2023081:2.8909895"],
                "routeFiles": ["routesEBOS08.txt",],
            },
        },
        "departureAltitude": "6000",
        "elevation": "7.0",
        "intensity": {
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
        }
    },
    "EBAW": {
        "atcGroup": "atcBRApp",
        "departureAltitude": "3000",
        "elevation": "32.0",
        "configurations": {
            "11": {
                "approaches": ["ILS11:51.1931596:4.4550205:51.1903477:4.4724417"],
                "routeFiles": ["routesEBAW11.txt",],
            },
            "29": {
                "approaches": ["ILS29:51.1870497:4.4762353:51.1921273:4.4541824"],
                "routeFiles": ["routesEBAW29.txt",],
            },
        },
        "intensity": {
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
        }
    },
    "EBCI": {
        "atcGroup": "atcBRApp",
        "departureAltitude": "4000",
        "elevation": "606.0",
        "configurations": {
            "06": {
                "approaches": ["ILS06:50.4546270:4.4443984:50.4604395:4.4723034"],
                "routeFiles": ["routesEBCI06.txt",],
            },
            "24": {
                "approaches": ["ILS24:50.4669940:4.4777130:50.4552048:4.4368566"],
                "routeFiles": ["routesEBCI24.txt",],
            },
        },
        "intensity": {
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
        }
    },
    "EBLG": {
        "atcGroup": "atcLGApp",
        "departureAltitude": "5000",
        "elevation": "651.0",
        "configurations": {
            "04R": {
                "approaches": [
                    "ILS04R:50.6290487:5.4309522:50.6474550:5.4602396",
                ],
                "routeFiles": ["routesEBLG04s.txt",],
            },
            "22L": {
                "approaches": [
                    "ILS22L:50.6474550:5.4602396:50.6290487:5.4309522",
                ],
                "routeFiles": ["routesEBLG22s.txt",],
            },
        },
        "intensity": {
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
        }
    },
} satisfies { [key in ScenarioAirport]: AirportData };
