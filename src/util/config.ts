import path from "path";
import {Config} from "../types/config";
import fs from "fs";

let config: Config = global.config;
if (!config) {
    let argConfigPath = process.argv.find(x => x.startsWith('betty_config='))
            ?.replace('betty_config=', '');
    if (argConfigPath !== undefined && argConfigPath.startsWith('.')) {
        argConfigPath = path.join(__dirname, argConfigPath);
    }
    const configPath = argConfigPath ?? path.join(__dirname, 'config.json');
    config = <Config>JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    global.config = config;
}
export default config satisfies Config;

