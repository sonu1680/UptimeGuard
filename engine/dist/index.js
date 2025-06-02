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
const cron_1 = require("cron");
const tryCatchHandler_1 = require("./lib/tryCatchHandler");
const prisma_1 = require("./lib/prisma");
const RedisManager_1 = require("./lib/RedisManager");
const job = new cron_1.CronJob("*/2 * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, tryCatchHandler_1.tryCatchHandler)(() => prisma_1.prisma.monitor.findMany({
        where: {
            checkInterval: "2",
        },
        select: {
            url: true,
            monitorId: true,
            checkInterval: true,
        },
    }));
    if (res.data) {
        RedisManager_1.RedisManager.getInstance().sendToWorker(res.data);
    }
    else {
        console.error("Failed to fetch monitors or none found.");
    }
}));
job.start();
