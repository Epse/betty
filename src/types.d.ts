import {Config} from "./types/config";

declare global {
    namespace NodeJS {
        interface Global {
            config: Config
        }
    }
}
