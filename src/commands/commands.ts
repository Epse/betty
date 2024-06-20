import help from './basic/help';
import loa from './basic/loa';
import {Command} from "../types/command";
import atis from "./basic/atis";
import publish from "./events/publish";

export default [
    help,
    loa,
    atis,
    publish,
] as Command[];
