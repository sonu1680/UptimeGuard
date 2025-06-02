"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisManager = void 0;
const redis_1 = require("redis");
class RedisManager {
    constructor() {
        this.client = (0, redis_1.createClient)();
        this.client.connect();
        this.publisher = (0, redis_1.createClient)();
        this.publisher.connect();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new RedisManager();
        }
        return this.instance;
    }
    sendAndAwait(monitoringId, url, interval) {
        return new Promise((resolve) => {
            this.client.subscribe(monitoringId, (data) => {
                this.client.unsubscribe(monitoringId);
                resolve(JSON.parse(data));
            });
            this.publisher.lPush("message", JSON.stringify({ monitoringId: monitoringId, data: url }));
        });
    }
}
exports.RedisManager = RedisManager;
