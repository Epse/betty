import path from "path";
import {Config} from "../types/config";
import fs from "fs";

if (!global.config) {
    const configPath = path.join(__dirname, 'config.json');
    global.config = <Config>JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}
export default global.config satisfies Config;

