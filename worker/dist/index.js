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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const checkStatus_1 = require("./lib/checkStatus");
const redisClient = (0, redis_1.createClient)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield redisClient.connect();
        console.log("connected");
        while (true) {
            const res = yield redisClient.rPop("message");
            if (res) {
                try {
                    const data = JSON.parse(res);
                    const response = yield (0, checkStatus_1.checkStatus)(data);
                    yield redisClient.publish(response.batchId, JSON.stringify(response));
                }
                catch (error) {
                    console.error("Error parsing message:", error);
                }
            }
            else {
                yield new Promise((resolve) => setTimeout(resolve, 500));
            }
        }
    });
}
main().catch((err) => {
    console.error("Error in worker:", err);
});
