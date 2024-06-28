import {AirportData, RouteDefinition, ScenarioAirport} from "../types";

const ebbr_25r_spawn = "51.0215520:4.8851435:2000:0:2796";
const ebbr_25l_spawn = "50.9892884:4.9207760:3000:0:2848";

const ebbr_25l_ifr: RouteDefinition = {
    spawn: ebbr_25l_spawn,
    route: "IB141/2500 RWL25 ILS25L",
    reqAlt: "IBI41:2500",
};

const ebbr_25r_ifr: RouteDefinition = {
    spawn: ebbr_25r_spawn,
    route: "NAXOD RWR25 ILS25R",
    reqAlt: "NAXOD:2000",
}

const ebbr_01_ifr: RouteDefinition = {
    spawn: "50.9892884:4.9207760:3000:0:2848",
    route: "BURUS/2000 BR01F RW01 ILS01",
    reqAlt: "BURUS:2000"
}

const ebos_vfr: RouteDefinition[] = [
    {'route': null, 'spawn': '51.1189092:2.5676187:1500:0:656:0', 'reqAlt': 'EBOS:1000'},
    {'route': null, 'spawn': '51.1053218:2.6821664:1500:0:740:0', 'reqAlt': 'EBOS:1000'},
    {'route': null, 'spawn': '51.1386064:3.1521641:1500:0:3584:0', 'reqAlt': 'EBOS:1000'},
    {'route': null, 'spawn': '51.0666650:3.1032654:1500:0:3504:0', 'reqAlt': 'EBOS:1000'},
    {'route': null, 'spawn': '51.3534567:3.2081453:1500:0:2752:0', 'reqAlt': 'EBOS:1000'},
    {'route': null, 'spawn': '51.0976137:2.9344726:1500:0:28:0', 'reqAlt': 'EBOS:1000'},
    {'route': null, 'spawn': '51.1634866:3.1763065:1500:0:3336:0', 'reqAlt': 'EBOS:1000'}];

const ebbr_vfr_not_01: RouteDefinition[] = [
    {
        'route': '[50.68,4.419] [50.72,4.42] [50.799,4.472] [50.869,4.517]',
        'spawn': '50.6223202:4.2829339:1500:0:612:0',
        'reqAlt': 'EBBR:1000'
    },
    {
        'route': '[50.68,4.419] [50.72,4.42] [50.799,4.472] [50.869,4.517]',
        'spawn': '50.6242210:4.4461860:1500:0:3792:0',
        'reqAlt': 'EBBR:1000'
    },
    {
        'route': '[50.68,4.419] [50.72,4.42] [50.799,4.472] [50.869,4.517]',
        'spawn': '50.6597234:4.5243708:1500:0:3224:0',
        'reqAlt': 'EBBR:1000'
    },
    {
        'route': '[50.735,4.579] [50.764,4.55] [50.774,4.528] [50.792,4.5] [50.804,4.481] [50.87,4.519]',
        'spawn': '50.6737578:4.5931662:1500:0:4036:0',
        'reqAlt': 'EBBR:1000'
    },
    {
        'route': '[50.735,4.579] [50.764,4.55] [50.774,4.528] [50.792,4.5] [50.804,4.481] [50.87,4.519]',
        'spawn': '50.7457551:4.7153597:1500:0:3028:0',
        'reqAlt': 'EBBR:1000'
    },
    {
        'route': '[50.735,4.579] [50.764,4.55] [50.774,4.528] [50.792,4.5] [50.804,4.481] [50.87,4.519]',
        'spawn': '50.7865922:4.7008541:1500:0:2704:0',
        'reqAlt': 'EBBR:1000'
    },
    {
        'route': '[51.077,4.461] [51.074,4.438] [51.049,4.449] [51.01,4.461] [50.966,4.479] [50.933,4.461]',
        'spawn': '51.1028769:4.3548687:1500:0:1392:0',
        'reqAlt': 'EBBR:1000'
    },
    {
        'route': '[51.077,4.461] [51.074,4.438] [51.049,4.449] [51.01,4.461] [50.966,4.479] [50.933,4.461]',
        'spawn': '51.1273381:4.5402446:1500:0:2320:0',
        'reqAlt': 'EBBR:1000'
    },
    {
        'route': '[51.077,4.461] [51.074,4.438] [51.049,4.449] [51.01,4.461] [50.966,4.479] [50.933,4.461]',
        'spawn': '51.0984074:4.6488951:1500:0:2828:0',
        'reqAlt': 'EBBR:1000'
    },
    {
        'route': '[51.077,4.461] [51.074,4.438] [51.049,4.449] [51.01,4.461] [50.966,4.479] [50.933,4.461]',
        'spawn': '51.0458097:4.2760871:1500:0:820:0',
        'reqAlt': 'EBBR:1000'
    }
];

const ebbr_vfr_with_01: RouteDefinition[] = [
    {
        'route': '[50.866,4.169] [50.873,4.216] [50.874,4.276] [50.888,4.305] [50.9,4.339] [50.91,4.374] [50.904,4.427] [50.906,4.456]',
        'spawn': '50.8969650:4.0663801:1500:0:1256:0',
        'reqAlt': 'EBBR:1000'
    }, {
        'route': '[50.866,4.169] [50.873,4.216] [50.874,4.276] [50.888,4.305] [50.9,4.339] [50.91,4.374] [50.904,4.427] [50.906,4.456]',
        'spawn': '50.8270543:4.0485650:1500:0:696:0',
        'reqAlt': 'EBBR:1000'
    }, {
        'route': '[50.866,4.169] [50.873,4.216] [50.874,4.276] [50.888,4.305] [50.9,4.339] [50.91,4.374] [50.904,4.427] [50.906,4.456]',
        'spawn': '50.7996587:4.1577466:1500:0:80:0',
        'reqAlt': 'EBBR:1000'
    }, {
        'route': '[50.844,4.726] [50.875,4.581] [50.872,4.51]',
        'spawn': '50.7548817:4.6561227:1500:0:268:0',
        'reqAlt': 'EBBR:1000'
    }, {
        'route': '[50.844,4.726] [50.875,4.581] [50.872,4.51]',
        'spawn': '50.8875508:4.8515784:1500:0:2776:0',
        'reqAlt': 'EBBR:1000'
    }, {
        'route': '[50.844,4.726] [50.875,4.581] [50.872,4.51]',
        'spawn': '50.8065446:4.7919234:1500:0:3500:0',
        'reqAlt': 'EBBR:1000'
    }
];


export default {
    "EBBR": {
        "atcGroup": "atcBRApp",
        apronMapping: [
            {types: ["Cargo"], aprons: ["apron-9"]},
            {types: ["Light"], aprons: ["apron-GA"]},
            {types: ["LowCost", "Schengen"], aprons: ["apron-1-north-low-cost"]},
            {types: ["Schengen"], aprons: ["apron-1-north", "apron-1-south"]},
            {types: [], aprons: ["apron-2-north", "apron-2-south"]}, // Fallback
        ],
        "departureAltitude": "6000",
        "elevation": "175.0",
        "configurations": {
            "25S": {
                "approaches": [
                    "ILS25L:50.8988090:4.5226183:50.8897673:4.4832953",
                    "ILS25R:50.9125335:4.5025848:50.8990607:4.4563412",
                ],
                "routeFiles": ["routesEBBR25s.txt",],
                routes: {
                    vfr: ebbr_vfr_not_01,
                    ifr: [
                        ebbr_25r_ifr,
                        ebbr_25l_ifr
                    ]
                },
            },
            "07S": {
                "approaches": [
                    "ILS07L: 50.8989561:4.4559023: 50.9127120:4.5031361",
                    "ILS07R:50.8898451:4.4842205:50.8989886:4.5233715",
                ],
                "routeFiles": ["routesEBBR07s.txt",],
                routes: {
                    vfr: ebbr_vfr_not_01,
                    ifr: [
                        {
                            spawn: "50.9892884:4.9207760:3000:0:2848",
                            route: "44BUB/660 ILS07L",
                            reqAlt: "44BUB:660"
                        }
                    ],
                },
            },
            "19": {
                "approaches": [
                    "ILS25R:50.9119346:4.5007661:50.8989236:4.4560247",
                    "ILS19:50.9118475:4.5016226:50.8875164:4.4917777",
                ],
                "routeFiles": ["routesEBBR19.txt"],
                routes: {
                    vfr: ebbr_vfr_with_01,
                    ifr: [
                        {
                            spawn: "50.9892884:4.9207760:3000:0:2848",
                            route: "ILS19 BR19F RW19",
                            reqAlt: "VAMVO:2500",
                        }
                    ],
                },
            },
            "01": {
                "approaches": [
                    "ILS07R:50.8898451:4.4842205:50.8989886:4.5233715",
                    "ILS01:50.8870045:4.4916250:50.9122126:4.5016366",
                ],
                "routeFiles": ["routesEBBR01.txt"],
                routes: {
                    vfr: ebbr_vfr_with_01,
                    ifr: [
                        ebbr_01_ifr
                    ],
                },
            },
            "2519DEP25RARR": {
                "approaches": [
                    "ILS25L:50.8988090:4.5226183:50.8897673:4.4832953",
                    "ILS25R:50.9119346:4.5007661:50.8989236:4.4560247",
                    "ILS19:50.9113969:4.5013690:50.8869201:4.4915758",
                ],
                "routeFiles": ["routesEBBR1925R.txt",],
                routes: {
                    vfr: ebbr_vfr_with_01,
                    ifr: [
                        ebbr_25r_ifr
                    ],
                },
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
                ],
                routes: {
                    vfr: ebbr_vfr_with_01,
                    ifr: [
                        ebbr_01_ifr
                    ],
                },
            },
            "25RDEP25LARR": {
                "approaches": [
                    "ILS25L:50.8988090:4.5226183:50.8897673:4.4832953",
                    "ILS25R:50.9125335:4.5025848:50.8990607:4.4563412",
                ],
                "routeFiles": ["routesEBBR25s.txt",],
                routes: {
                    vfr: ebbr_vfr_not_01,
                    ifr: [
                        ebbr_25l_ifr
                    ]
                },
            },
        },
        "intensity": {
            "LOW": {
                "initial": 2,
                "ifrDepartures": 11,
                "ifrArrivals": 11,
                "vfrDepartures": 2,
                "vfrArrivals": 3,
                "faults": 3
            },
            "MEDIUM": {
                "initial": 4,
                "ifrDepartures": 18,
                "ifrArrivals": 17,
                "vfrDepartures": 3,
                "vfrArrivals": 4,
                "faults": 5
            },
            "HIGH": {
                "initial": 5,
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
        apronMapping: [
            {types: ["Heavy"], aprons: ["apron-P1-V-heavy"]},
            {types: ["Light"], aprons: ["apron-P5"]},
            {types: ["Cargo"], aprons: ["apron-P10-Z"]},
            {types: ["NonSchengen", "LowCost"], aprons: ["apron-P1-V-nonshengen"]}, // That typo is in the gate manager, ugh
            {types: ["NonSchengen"], aprons: ["apron-P1-A-nonshengen"]},
            {types: ["Medium"], aprons: ["apron-P1-A"]},
        ],
        "elevation": "1234.0",
        "departureAltitude": "4000",
        "configurations": {
            "06": {
                "approaches": [
                    "ILS06:49.6174735:6.1876052:49.6355411:6.2361562",
                    "ILS24:49.6355441:6.2360036:49.6175949:6.1876900",
                ],
                "routeFiles": ["routesELLX06.txt",],
                routes: {
                    vfr: [{
                        'route': '[49.752482,6.111166]/2000 [49.658974,6.194170] [49.649123,6.201394] [49.619719,6.123610] [49.607286,6.136261] [49.606110,6.157220] LW',
                        'spawn': '49.7842296:6.1777832:2500:0:2636:0',
                        'reqAlt': 'ELLX:2000'
                    }, {
                        'route': '[49.752482,6.111166]/2000 [49.658974,6.194170] [49.649123,6.201394] [49.619719,6.123610] [49.607286,6.136261] [49.606110,6.157220] LW',
                        'spawn': '49.7876621:6.0899263:2500:0:1836:0',
                        'reqAlt': 'ELLX:2000'
                    }, {
                        'route': '[49.752482,6.111166]/2000 [49.658974,6.194170] [49.649123,6.201394] [49.619719,6.123610] [49.607286,6.136261] [49.606110,6.157220] LW',
                        'spawn': '49.7463508:6.0075496:2500:0:996:0',
                        'reqAlt': 'ELLX:2000'
                    }, {
                        'route': '[49.542916,6.371387]/2000 [49.593079,6.252822] [49.611261,6.233333] [49.582133,6.159056] [49.595500,6.147431] [49.605491,6.156204] LW',
                        'spawn': '49.4939746:6.3427218:2500:0:232:0',
                        'reqAlt': 'ELLX:2000'
                    }, {
                        'route': '[49.542916,6.371387]/2000 [49.593079,6.252822] [49.611261,6.233333] [49.582133,6.159056] [49.595500,6.147431] [49.605491,6.156204] LW',
                        'spawn': '49.5198231:6.4020717:2500:0:3612:0',
                        'reqAlt': 'ELLX:2000'
                    }, {
                        'route': '[49.542916,6.371387]/2000 [49.593079,6.252822] [49.611261,6.233333] [49.582133,6.159056] [49.595500,6.147431] [49.605491,6.156204] LW',
                        'spawn': '49.5435943:6.4261835:2500:0:3060:0',
                        'reqAlt': 'ELLX:2000'
                    }],
                    ifr: [
                        {
                            spawn: "49.7262624:6.4830916:3000:0:2724",
                            route: "LX24I/3000 LX24F ILS24",
                            reqAlt: "LX24I:3000"
                        }
                    ],
                },
            },
            "24": {
                "approaches": [
                    "ILS06:49.6174735:6.1876052:49.6355411:6.2361562",
                    "ILS24:49.6355441:6.2360036:49.6175949:6.1876900",
                ],
                "routeFiles": ["routesELLX24.txt",],
                routes: {
                    vfr: [{
                        'route': '[49.752482,6.111166]/2000 [49.658974,6.194170] [49.649123,6.201394] [49.619719,6.123610] [49.607286,6.136261] [49.606110,6.157220] LW',
                        'spawn': '49.7842296:6.1777832:2500:0:2636:0',
                        'reqAlt': 'ELLX:2000'
                    }, {
                        'route': '[49.752482,6.111166]/2000 [49.658974,6.194170] [49.649123,6.201394] [49.619719,6.123610] [49.607286,6.136261] [49.606110,6.157220] LW',
                        'spawn': '49.7876621:6.0899263:2500:0:1836:0',
                        'reqAlt': 'ELLX:2000'
                    }, {
                        'route': '[49.752482,6.111166]/2000 [49.658974,6.194170] [49.649123,6.201394] [49.619719,6.123610] [49.607286,6.136261] [49.606110,6.157220] LW',
                        'spawn': '49.7463508:6.0075496:2500:0:996:0',
                        'reqAlt': 'ELLX:2000'
                    }, {
                        'route': '[49.542916,6.371387]/2000 [49.593079,6.252822] [49.611261,6.233333] [49.582133,6.159056] [49.595500,6.147431] [49.605491,6.156204] LW',
                        'spawn': '49.4939746:6.3427218:2500:0:232:0',
                        'reqAlt': 'ELLX:2000'
                    }, {
                        'route': '[49.542916,6.371387]/2000 [49.593079,6.252822] [49.611261,6.233333] [49.582133,6.159056] [49.595500,6.147431] [49.605491,6.156204] LW',
                        'spawn': '49.5198231:6.4020717:2500:0:3612:0',
                        'reqAlt': 'ELLX:2000'
                    }, {
                        'route': '[49.542916,6.371387]/2000 [49.593079,6.252822] [49.611261,6.233333] [49.582133,6.159056] [49.595500,6.147431] [49.605491,6.156204] LW',
                        'spawn': '49.5435943:6.4261835:2500:0:3060:0',
                        'reqAlt': 'ELLX:2000'
                    }],
                    ifr: [
                        {
                            spawn: "49.7262624:6.4830916:3000:0:2724",
                            route: "LX24I/3000 LX24F ILS24",
                            reqAlt: "LX24I:3000"
                        }
                    ],
                },
            },
        },
        "intensity": {
            "LOW": {
                "initial": 2,
                "ifrDepartures": 8,
                "ifrArrivals": 8,
                "vfrDepartures": 1,
                "vfrArrivals": 1,
                "faults": 2
            },
            "MEDIUM": {
                "initial": 2,
                "ifrDepartures": 12,
                "ifrArrivals": 12,
                "vfrDepartures": 2,
                "vfrArrivals": 2,
                "faults": 3
            },
            "HIGH": {
                "initial": 3,
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
        apronMapping: [
            {types: ["Cargo"], aprons: ["apron-1", "apron-2-cargo"]},
            {types: ["Light"], aprons: ["apron-3"]},
            {types: ["Medium"], aprons: ["apron-2"]},
            {types: [], aprons: ["apron-2-overflow"]}
        ],
        "configurations": {
            "26": {
                "approaches": ["ILS26:51.2023081:2.8909895:51.1972448:2.8575650"],
                "routeFiles": ["routesEBOS26.txt",],
                routes: {
                    vfr: ebos_vfr,
                    ifr: [
                        {
                            spawn: "49.7262624:6.4830916:3000:0:2724",
                            reqAlt: "OS26F:2000",
                            route: "NOYON OS26F/2000 ILS26"
                        }
                    ],
                },
            },
            "08": {
                "approaches": ["ILS08:51.1972448:2.8575650:51.2023081:2.8909895"],
                "routeFiles": ["routesEBOS08.txt",],
                routes: {
                    vfr: ebos_vfr,
                    ifr: [
                        {
                            spawn: "51.1456635:2.5216011:2500:0:868",
                            route: "AUZON OS08F/2000 ILS08",
                            reqAlt: "OS08F:2000"
                        }
                    ],
                },
            },
        },
        "departureAltitude": "6000",
        "elevation": "7.0",
        "intensity": {
            "LOW": {
                "initial": 1,
                "ifrDepartures": 7,
                "ifrArrivals": 6,
                "vfrDepartures": 3,
                "vfrArrivals": 3,
                "faults": 2
            },
            "MEDIUM": {
                "initial": 2,
                "ifrDepartures": 11,
                "ifrArrivals": 10,
                "vfrDepartures": 5,
                "vfrArrivals": 5,
                "faults": 3
            },
            "HIGH": {
                "initial": 3,
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
        apronMapping: [
            {types: ["Light"], aprons: ["apron-2", "apron-GA"]},
            {types: [], aprons: ["apron-1"]},
        ],
        "departureAltitude": "3000",
        "elevation": "32.0",
        "configurations": {
            "11": {
                "approaches": ["ILS11:51.1931596:4.4550205:51.1903477:4.4724417"],
                "routeFiles": ["routesEBAW11.txt",],
                routes: {
                    vfr: [{
                        'route': '[51.121,4.216] [51.12,4.309] [51.126,4.428] [51.17,4.453] [51.187,4.363] [51.2,4.369] [51.206,4.393]',
                        'spawn': '51.1286598:4.1360936:1500:0:1120:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.121,4.216] [51.12,4.309] [51.126,4.428] [51.17,4.453] [51.187,4.363] [51.2,4.369] [51.206,4.393]',
                        'spawn': '51.0744915:4.1299036:1500:0:576:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.121,4.216] [51.12,4.309] [51.126,4.428] [51.17,4.453] [51.187,4.363] [51.2,4.369] [51.206,4.393]',
                        'spawn': '51.0756372:4.2049876:1500:0:124:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.085,4.495] [51.125,4.43] [51.168,4.456] [51.188,4.366] [51.199,4.372] [51.206,4.397]',
                        'spawn': '51.0658234:4.3798378:1500:0:848:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.085,4.495] [51.125,4.43] [51.168,4.456] [51.188,4.366] [51.199,4.372] [51.206,4.397]',
                        'spawn': '51.0704269:4.5887043:1500:0:3228:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.085,4.495] [51.125,4.43] [51.168,4.456] [51.188,4.366] [51.199,4.372] [51.206,4.397]',
                        'spawn': '51.0993622:4.6027956:1500:0:2948:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.171,4.808] [51.207,4.481] [51.226,4.396] [51.217,4.392] [51.205,4.399]',
                        'spawn': '51.1398903:4.8626912:1500:0:3548:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.171,4.808] [51.207,4.481] [51.226,4.396] [51.217,4.392] [51.205,4.399]',
                        'spawn': '51.2217881:4.8133594:1500:0:2092:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.171,4.808] [51.207,4.481] [51.226,4.396] [51.217,4.392] [51.205,4.399]',
                        'spawn': '51.1798270:4.9075770:1500:0:3000:0',
                        'reqAlt': 'EBAW:1000'
                    }],
                    ifr: [
                        {
                            spawn: "51.2515423:4.0952255:3000:0:964",
                            route: "BEVRI/3000 AW11F ILS11",
                            reqAlt: "BEVRI:3000",
                        }
                    ],
                },
            },
            "29": {
                "approaches": ["ILS29:51.1870497:4.4762353:51.1921273:4.4541824"],
                "routeFiles": ["routesEBAW29.txt",],
                routes: {
                    vfr: [{
                        'route': '[51.118,4.216] [51.120,4.308] [51.127,4.43] [51.169,4.454] [51.152,4.531] [51.165,4.538] [51.177,4.528]',
                        'spawn': '51.1286598:4.1360936:1500:0:1120:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.118,4.216] [51.120,4.308] [51.127,4.43] [51.169,4.454] [51.152,4.531] [51.165,4.538] [51.177,4.528]',
                        'spawn': '51.0744915:4.1299036:1500:0:576:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.118,4.216] [51.120,4.308] [51.127,4.43] [51.169,4.454] [51.152,4.531] [51.165,4.538] [51.177,4.528]',
                        'spawn': '51.0756372:4.2049876:1500:0:124:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.084,4.495] [51.128,4.429] [51.166,4.452] [51.152,4.52] [51.164,4.526] [51.178,4.517]',
                        'spawn': '51.0658234:4.3798378:1500:0:848:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.084,4.495] [51.128,4.429] [51.166,4.452] [51.152,4.52] [51.164,4.526] [51.178,4.517]',
                        'spawn': '51.0704269:4.5887043:1500:0:3228:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.084,4.495] [51.128,4.429] [51.166,4.452] [51.152,4.52] [51.164,4.526] [51.178,4.517]',
                        'spawn': '51.0993622:4.6027956:1500:0:2948:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.174,4.807] [51.178,4.521]',
                        'spawn': '51.1398903:4.8626912:1500:0:3548:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.174,4.807] [51.178,4.521]',
                        'spawn': '51.2217881:4.8133594:1500:0:2092:0',
                        'reqAlt': 'EBAW:1000'
                    }, {
                        'route': '[51.174,4.807] [51.178,4.521]',
                        'spawn': '51.1798270:4.9075770:1500:0:3000:0',
                        'reqAlt': 'EBAW:1000'
                    }],
                    ifr: [
                        {
                            spawn: "51.1173469:4.8726215:3000:0:3104",
                            route: "BUN/3000 AW29F/2500 ILS29",
                            reqAlt: "AW29F:2500",
                        }
                    ],
                },
            },
        },
        "intensity": {
            "LOW": {
                "initial": 2,
                "ifrDepartures": 8,
                "ifrArrivals": 8,
                "vfrDepartures": 4,
                "vfrArrivals": 3,
                "faults": 2
            },
            "MEDIUM": {
                "initial": 3,
                "ifrDepartures": 13,
                "ifrArrivals": 12,
                "vfrDepartures": 6,
                "vfrArrivals": 5,
                "faults": 3
            },
            "HIGH": {
                "initial": 4,
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
        apronMapping: [
            {types: ["Heavy"], aprons: ["apron-P10-heavy", "apron-P11-heavy"]},
            {types: ["Light"], aprons: ["apron-P1", "apron-P3", "apron-P4"]},
            {types: [], aprons: ["apron-P10", "apron-P11", "apron-P12", "apron-P13", "apron-P14", "apron-P15"]},
        ],
        "departureAltitude": "4000",
        "elevation": "606.0",
        "configurations": {
            "06": {
                "approaches": ["ILS06:50.4546270:4.4443984:50.4604395:4.4723034"],
                "routeFiles": ["routesEBCI06.txt",],
                routes: {
                    vfr: [{
                        'route': '[50.344,4.472] [50.416,4.493] [50.436,4.482] [50.407,4.373] [50.423,4.358] [50.436,4.369]',
                        'spawn': '50.3526258:4.5610306:1500:0:2960:0',
                        'reqAlt': 'EBCI:2000'
                    }, {
                        'route': '[50.344,4.472] [50.416,4.493] [50.436,4.482] [50.407,4.373] [50.423,4.358] [50.436,4.369]',
                        'spawn': '50.3261410:4.3355318:1500:0:896:0',
                        'reqAlt': 'EBCI:2000'
                    }, {
                        'route': '[50.344,4.472] [50.416,4.493] [50.436,4.482] [50.407,4.373] [50.423,4.358] [50.436,4.369]',
                        'spawn': '50.2837845:4.4320838:1500:0:272:0',
                        'reqAlt': 'EBCI:2000'
                    }, {
                        'route': '[50.564,4.316] [50.487,4.445] [50.457,4.329] [50.443,4.339] [50.44,4.368]',
                        'spawn': '50.5850179:4.3896043:1500:0:2252:0',
                        'reqAlt': 'EBCI:2000'
                    }, {
                        'route': '[50.564,4.316] [50.487,4.445] [50.457,4.329] [50.443,4.339] [50.44,4.368]',
                        'spawn': '50.5966738:4.4505160:1500:0:2524:0',
                        'reqAlt': 'EBCI:2000'
                    }, {
                        'route': '[50.564,4.316] [50.487,4.445] [50.457,4.329] [50.443,4.339] [50.44,4.368]',
                        'spawn': '50.5569060:4.2559213:1500:0:1228:0',
                        'reqAlt': 'EBCI:2000'
                    }],
                    ifr: [
                        {
                            spawn: "50.5568592:4.7943158:3000:0:2812",
                            route: "REKPI CI06F/2500 ILS06",
                            reqAlt: "CI06F:2500"
                        }
                    ],
                },
            },
            "24": {
                "approaches": ["ILS24:50.4669940:4.4777130:50.4552048:4.4368566"],
                "routeFiles": ["routesEBCI24.txt",],
                routes: {
                    vfr: [{
                        'route': '[50.565,4.457] [50.478,4.448] [50.504,4.524] [50.495,4.533] [50.48,4.521]',
                        'spawn': '50.3485172:4.5423493:1500:0:368:0',
                        'reqAlt': 'EBCI:2000'
                    }, {
                        'route': '[50.565,4.457] [50.478,4.448] [50.504,4.524] [50.495,4.533] [50.48,4.521]',
                        'spawn': '50.3546602:4.6001766:1500:0:3820:0',
                        'reqAlt': 'EBCI:2000'
                    }, {
                        'route': '[50.565,4.457] [50.478,4.448] [50.504,4.524] [50.495,4.533] [50.48,4.521]',
                        'spawn': '50.3697548:4.6846373:1500:0:3212:0',
                        'reqAlt': 'EBCI:2000'
                    }, {
                        'route': '[50.565,4.457] [50.478,4.448] [50.504,4.524] [50.495,4.533] [50.48,4.521]',
                        'spawn': '50.5856340:4.3896214:1500:0:1528:0',
                        'reqAlt': 'EBCI:2000'
                    }, {
                        'route': '[50.565,4.457] [50.478,4.448] [50.504,4.524] [50.495,4.533] [50.48,4.521]',
                        'spawn': '50.5985114:4.4515441:1500:0:2012:0',
                        'reqAlt': 'EBCI:2000'
                    }, {
                        'route': '[50.565,4.457] [50.478,4.448] [50.504,4.524] [50.495,4.533] [50.48,4.521]',
                        'spawn': '50.6004382:4.5004595:1500:0:2340:0',
                        'reqAlt': 'EBCI:2000'
                    }],
                    ifr: [
                        {
                            spawn: "50.5568592:4.7943158:3000:0:2812",
                            route: "VAMKA CI24F ILS24",
                            reqAlt: "CI24F:3000"
                        }
                    ],
                },
            },
        },
        "intensity": {
            "LOW": {
                "initial": 1,
                "ifrDepartures": 7,
                "ifrArrivals": 6,
                "vfrDepartures": 3,
                "vfrArrivals": 3,
                "faults": 2
            },
            "MEDIUM": {
                "initial": 2,
                "ifrDepartures": 11,
                "ifrArrivals": 10,
                "vfrDepartures": 7,
                "vfrArrivals": 7,
                "faults": 4
            },
            "HIGH": {
                "initial": 3,
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
        apronMapping: [
            {types: ["Light"], aprons: ["apron-GA"]},
            {types: ["Cargo"], aprons: ["apron-north"]},
            {types: [], aprons: ["apron-P1"]}, // Good enough
        ],
        "departureAltitude": "5000",
        "elevation": "651.0",
        "configurations": {
            "04R": {
                "approaches": [
                    "ILS04R:50.6290487:5.4309522:50.6474550:5.4602396",
                ],
                "routeFiles": ["routesEBLG04s.txt",],
                routes: {
                    vfr: [{
                        'route': '[50.71,5.254] [50.656,5.414] [50.621,5.366] [50.612,5.383] [50.613,5.406]',
                        'spawn': '50.6980756:5.2048221:{}:0:960:0',
                        'reqAlt': 'EBLG:2000'
                    }, {
                        'route': '[50.71,5.254] [50.656,5.414] [50.621,5.366] [50.612,5.383] [50.613,5.406]',
                        'spawn': '50.7498878:5.2570727:{}:0:1752:0',
                        'reqAlt': 'EBLG:2000'
                    }, {
                        'route': '[50.71,5.254] [50.656,5.414] [50.621,5.366] [50.612,5.383] [50.613,5.406]',
                        'spawn': '50.7473511:5.3195460:{}:0:2260:0',
                        'reqAlt': 'EBLG:2000'
                    }, {
                        'route': '[50.562,5.577] [50.6,5.451] [50.589,5.42] [50.59,5.4] [50.608,5.399]',
                        'spawn': '50.5145074:5.5320040:{}:0:140:0',
                        'reqAlt': 'EBLG:2000'
                    }, {
                        'route': '[50.562,5.577] [50.6,5.451] [50.589,5.42] [50.59,5.4] [50.608,5.399]',
                        'spawn': '50.5222406:5.6133292:{}:0:3616:0',
                        'reqAlt': 'EBLG:2000'
                    }, {
                        'route': '[50.562,5.577] [50.6,5.451] [50.589,5.42] [50.59,5.4] [50.608,5.399]',
                        'spawn': '50.5681927:5.6380548:{}:0:3044:0',
                        'reqAlt': 'EBLG:2000'
                    }],
                    ifr: [
                        {
                            reqAlt: "TUTSO:3000",
                            route: "TUTSO:3000 L04RF ILS04R",
                            spawn: "50.4520888:5.2478118:3000:0:3592"
                        }
                    ],
                },
            },
            "22L":
                {
                    "approaches": [
                        "ILS22L:50.6474550:5.4602396:50.6290487:5.4309522",
                    ],
                    "routeFiles":
                        ["routesEBLG22s.txt",],
                    routes:
                        {
                            vfr: [{
                                'route': '[50.702,5.281] [50.661,5.394] [50.654,5.406 [50.698,5.475] [50.684,5.497] [50.671,5.497]',
                                'spawn': '50.6980756:5.2048221:{}:0:960:0',
                                'reqAlt': 'EBLG:2000'
                            }, {
                                'route': '[50.702,5.281] [50.661,5.394] [50.654,5.406 [50.698,5.475] [50.684,5.497] [50.671,5.497]',
                                'spawn': '50.7498878:5.2570727:{}:0:1752:0',
                                'reqAlt': 'EBLG:2000'
                            }, {
                                'route': '[50.702,5.281] [50.661,5.394] [50.654,5.406 [50.698,5.475] [50.684,5.497] [50.671,5.497]',
                                'spawn': '50.7473511:5.3195460:{}:0:2260:0',
                                'reqAlt': 'EBLG:2000'
                            }, {
                                'route': '[50.567,5.561] [50.595,5.467] [50.606,5.445] [50.66,5.53] [50.671,5.515] [50.668,5.494]',
                                'spawn': '50.5145074:5.5320040:{}:0:140:0',
                                'reqAlt': 'EBLG:2000'
                            }, {
                                'route': '[50.567,5.561] [50.595,5.467] [50.606,5.445] [50.66,5.53] [50.671,5.515] [50.668,5.494]',
                                'spawn': '50.5222406:5.6133292:{}:0:3616:0',
                                'reqAlt': 'EBLG:2000'
                            }, {
                                'route': '[50.567,5.561] [50.595,5.467] [50.606,5.445] [50.66,5.53] [50.671,5.515] [50.668,5.494]',
                                'spawn': '50.5681927:5.6380548:{}:0:3044:0',
                                'reqAlt': 'EBLG:2000'
                            }],
                            ifr:
                                [
                                    {
                                        route: "LIBVA/2500 L22LF ILS22L",
                                        reqAlt: "LIBVA:2500",
                                        spawn: "50.7293391:5.6864296:2500:0:3632"
                                    }
                                ],
                        }
                    ,
                }
            ,
        },
        "intensity": {
            "LOW": {
                "initial": 2,
                "ifrDepartures": 8,
                "ifrArrivals": 8,
                "vfrDepartures": 3,
                "vfrArrivals": 3,
                "faults": 2
            },
            "MEDIUM": {
                "initial": 3,
                "ifrDepartures": 14,
                "ifrArrivals": 12,
                "vfrDepartures": 5,
                "vfrArrivals": 5,
                "faults": 4
            },
            "HIGH": {
                "initial": 4,
                "ifrDepartures": 20,
                "ifrArrivals": 17,
                "vfrDepartures": 7,
                "vfrArrivals": 7,
                "faults": 5
            }
        }
    },
} satisfies { [key in ScenarioAirport]: AirportData };
