import path from "path";
import {Config} from "../types/config";
import fs from "fs";

if (!global.config) {
    let argConfigPath = process.argv.find(x => x.startsWith('betty_config='))
            ?.replace('betty_config=', '');
    if (argConfigPath.startsWith('.')) {
        argConfigPath = path.join(__dirname, argConfigPath);
    }
    const configPath = argConfigPath ?? path.join(__dirname, 'config.json');
    global.config = <Config>JSON.parse(fs.readFileSync(configPath, 'utf-8'));
}
export default global.config satisfies Config;

