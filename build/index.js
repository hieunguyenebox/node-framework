"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const path_1 = __importDefault(require("path"));
const colors_1 = __importDefault(require("colors"));
var FUNCTION_TYPE;
(function (FUNCTION_TYPE) {
    FUNCTION_TYPE[FUNCTION_TYPE["async"] = 0] = "async";
    FUNCTION_TYPE[FUNCTION_TYPE["await"] = 1] = "await";
})(FUNCTION_TYPE || (FUNCTION_TYPE = {}));
const listenErrors = () => {
    process.on('unhandledRejection', (reason, p) => {
        console.log(colors_1.default.bgRed.white(reason.stack));
    });
    process.on('uncaughtException', (reason) => {
        console.log(colors_1.default.bgRed.white(reason.stack));
    });
};
const bootstrapPlugins = (plugins) => __awaiter(this, void 0, void 0, function* () {
    try {
        if (Array.isArray(plugins)) {
            for (let pluginConfig of plugins) {
                const pluginPath = path_1.default.resolve(process.cwd(), `build/${pluginConfig.name}`);
                const plugin = require(pluginPath);
                if (plugin && typeof plugin.bootstrap === 'function') {
                    if (plugin.type === FUNCTION_TYPE.async)
                        plugin.bootstrap();
                    else
                        yield plugin.bootstrap();
                }
            }
        }
    }
    catch (ex) {
        console.log(colors_1.default.bgRed.white(ex));
    }
});
const start = () => {
    const environments = ['development', 'production', 'staging'];
    if (!environments.includes(process.env.NODE_ENV)) {
        console.log('Please provide NODE_ENV=development/staging/production'.red);
        process.exit(1);
    }
    listenErrors();
    const { plugins } = config_1.default.get('bootstrap');
    bootstrapPlugins(plugins);
};
start();
