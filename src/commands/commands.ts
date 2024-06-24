import help from './basic/help';
import loa from './basic/loa';
import {Command} from "../types/command";
import atis from "./basic/atis";
import event from "./events/event";
import license from "./basic/license";

export default [
    help,
    loa,
    atis,
    event,
    license,
] as Command[];
