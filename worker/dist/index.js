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
const checkStatus_1 = require("./lib/checkStatus");
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
        redisClient.on("error", (err) => console.log("Redis Client Error", err));
        yield redisClient.connect();
        console.log("connected");
        while (true) {
            const res = yield redisClient.brPop("message", 0);
            if (res === null || res === void 0 ? void 0 : res.element) {
                try {
                    const data = JSON.parse(res === null || res === void 0 ? void 0 : res.element);
                    const response = yield (0, checkStatus_1.checkStatus)(data);
                    yield redisClient.publish(response.batchId, JSON.stringify(response));
                }
                catch (error) { }
            }
        }
    });
}
main().catch((err) => {
    console.error("Error in worker:", err);
});
