import help from './basic/help';
import loa from './basic/loa';
import {Command} from "../types/command";
import atis from "./basic/atis";
import event from "./events/event";

export default [
    help,
    loa,
    atis,
    event,
] as Command[];
