import {firstFix} from "./first_fix";

test('First Fix works as expected', () => {
    const expected = [
        ["SOPOK", "N0449F370 SOPOK Y863 OGLOR DCT VIBOM DCT NOMBO DCT RIDAR DCT LATLO DCT OBEDI DCT DIPSA DCT ZAG DCT MOSAV/N0449F350 DCT GUBOK DCT VEBAR DCT RAMAP DCT RAXAD DCT RUGAS UN128 IMR G80 OKESA"],
        ["NIK", "N0425F320 NIK L191 VICOT N873 SPY/N0456F390 N873 JUIST DCT ATTUS DCT DETSO N873 ARS T317 ELTOK"],
        ["ROUSY", "N0473F330 ROUSY/N0473F330 DCT GTQ DCT POGOL DCT LASAT DCT MOROK DCT GILIR/N0468F350 DCT GVA DCT KOGAS DCT MEDAM DCT VEVAR UM623 KOLON DCT TAJEF DCT NESUL DCT ETOIL DCT CIRTA/N0467F350 UA605 RIMEL/N0472F370 UA605 DJA UB730 DIR UG862 AMPER/N0464F380 UG862 BUN/N0461F330 DCT ASEKA/N0456F320 DCT MUBAK DCT EGREK"],
        ["DENUT", "DENUT L610 TEBRA"],
        ["LNO", "N0377F190 LNO M170 KENUM/N0464F370 N853 ONUNE DCT ROBEG DCT MAKEL N851 GESKA Z711 MONAK"],
        ["ROUSY", "N0473F330 ROUSY/N0473F330 DCT GTQ DCT POGOL DCT LASAT DCT MOROK DCT GILIR/N0468F350 DCT GVA DCT KOGAS DCT MEDAM DCT VEVAR UM623 KOLON DCT TAJEF DCT NESUL DCT ETOIL DCT CIRTA/N0467F350 UA605 RIMEL/N0472F370 UA605 DJA UB730 DIR UG862 AMPER/N0464F380 UG862 BUN/N0461F330 DCT ASEKA/N0456F320 DCT MUBAK DCT EGREK"],
        ["HELEN", "HELEN UL179 GILTI L179 LAM DCT CPT L9 SIREN DCT OSGOD"],
        ["DENUT", "DENUT"],
        ["CIV", "N0439F230 CIV/N0439F239 N872 MEDIL/N0447F250 UN872 KIHVI/N0452F290 UN872 PON UT300 EVX UT176 BUSUK/N0458F370 UT176 KURIS/N0460F390 UT176 TERPO DCT PEXOD DCT NENEM P75 NEA N864 CRISA DCT VULPE N864 MAR M744 MGA N493 BERUM UW700 DIGEX"],
    ];

    for (const [fix, route] of expected) {
        expect(firstFix(route)).toBe(fix);
    }
});