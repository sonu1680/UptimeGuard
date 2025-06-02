"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisManager = void 0;
const redis_1 = require("redis");
const constant_1 = require("../constant");
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
    sendToWorker(websites) {
        const id = this.randomId();
        return new Promise((resolve) => {
            this.client.subscribe(id, (data) => {
                this.client.unsubscribe(id);
                this.sendToDB(JSON.parse(data));
                this.sendAlert(JSON.parse(data));
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
            if (site) {
                if (parseInt(site.responseCode) >= constant_1.SITE_DOWN_CODE_RANGE) {
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
