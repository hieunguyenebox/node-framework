"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const envPath = process.env.ENV_PATH || path_1.default.resolve(process.cwd(), '.env');
const loadENVConfig = () => {
    if (!fs_1.default.existsSync(envPath)) {
        console.log('Missing ENV_PATH'.red);
        process.exit(1);
    }
    const loadingEnvConfig = dotenv_1.default.config({
        path: envPath
    });
    if (loadingEnvConfig.error)
        console.error(loadingEnvConfig.error);
};
loadENVConfig();
