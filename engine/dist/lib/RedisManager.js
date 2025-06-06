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
exports.RedisManager = void 0;
const redis_1 = require("redis");
const constant_1 = require("../constant");
class RedisManager {
    constructor() {
        this.client = (0, redis_1.createClient)({
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: "redis-17571.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
                port: 17571,
            },
        });
        this.client.on("error", (err) => console.log("Redis Client Error", err));
        this.client.connect();
        console.log("Redis client connected ");
        this.publisher = (0, redis_1.createClient)({
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
            socket: {
                host: "redis-17571.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
                port: 17571,
            },
        });
        this.publisher.connect();
        this.publisher.on("error", (err) => console.log("Redis Client Error", err));
        console.log("Redis publisher connected");
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new RedisManager();
        }
        return this.instance;
    }
    sendToWorker(websites) {
        const id = this.randomId();
        return new Promise((resolve) => {
            this.client.subscribe(id, (data) => __awaiter(this, void 0, void 0, function* () {
                yield this.client.unsubscribe(id);
                this.sendToDB(JSON.parse(data));
                this.sendAlert(JSON.parse(data));
                resolve(JSON.parse(data));
            }));
            this.publisher.lPush("message", JSON.stringify({ batchId: id, data: websites }));
        });
    }
    sendToDB(data) {
        this.publisher.lPush("db_process", JSON.stringify({ batchId: data.batchId, data: data }));
    }
    sendAlert(data) {
        for (const site of data.sites) {
            if (site && site.responseCode) {
                const code = parseInt(site.responseCode);
                if (!isNaN(code) && code >= constant_1.SITE_DOWN_CODE_RANGE) {
                    const id = this.randomId();
                    this.publisher.lPush("alert_process", JSON.stringify({ id: id, data: site }));
                }
            }
        }
    }
    disconnectRedis() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Shutting down... disconnecting Redis");
            yield this.client.quit();
            yield this.publisher.quit();
            process.exit(0);
        });
    }
    randomId() {
        return (Math.random().toString().substring(2, 16) +
            Math.random().toString().substring(2, 16));
    }
}
exports.RedisManager = RedisManager;
