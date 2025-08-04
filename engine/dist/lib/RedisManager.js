"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisManager = void 0;
const redis_1 = require("redis");
const constant_1 = require("../constant");
class RedisManager {
    constructor() {
        this.isRedisConnected1 = false;
        this.isRedisConnected2 = false;
        this.client = (0, redis_1.createClient)({
            socket: {
                host: "redis",
                port: 6379,
            },
        });
        this.publisher = (0, redis_1.createClient)({
            socket: {
                host: "redis",
                port: 6379,
            },
        });
        this.client.connect().then((e) => {
            console.log(e);
            this.isRedisConnected1 = true;
            console.log("Redis 1 connected");
        });
        this.publisher.connect().then(() => {
            this.isRedisConnected2 = true;
            console.log("Redis 2 connected");
        });
        this.publisher.on("error", (err) => console.log("Redis Client Error", err));
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
            this.client.subscribe(id, (data) => {
                this.client.unsubscribe(id);
                this.sendToDB(JSON.parse(data));
                this.sendAlert(JSON.parse(data));
                //console.log(JSON.parse(data));
                resolve(JSON.parse(data));
            });
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
    randomId() {
        return (Math.random().toString().substring(2, 16) +
            Math.random().toString().substring(2, 16));
    }
}
exports.RedisManager = RedisManager;
