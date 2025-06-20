"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const responseDB_1 = require("./lib/responseDB");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisClient = (0, redis_1.createClient)({
    username: encodeURIComponent(process.env.REDIS_USERNAME || ""),
    password: encodeURIComponent(process.env.REDIS_PASSWORD || ""),
    socket: {
        host: "redis-17571.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
        port: 17571,
    },
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            redisClient.on("error", (err) => console.log("Redis Client Error", err));
            yield redisClient.connect();
            console.log("Redis connected");
            while (true) {
                try {
                    const res = yield redisClient.brPop("db_process", 0);
                    if (res === null || res === void 0 ? void 0 : res.element) {
                        console.log(res);
                        const data = JSON.parse(res.element);
                        yield (0, responseDB_1.responseDB)(data.data);
                    }
                }
                catch (err) {
                    console.error("DB Process Error:", err);
                }
            }
        }
        catch (err) {
            console.error("Fatal Worker Error:", err);
        }
    });
}
main().catch(() => {
});
