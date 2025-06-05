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
const fetchFromDB_1 = require("./lib/fetchFromDB");
const MIN_1 = "1";
const MIN_5 = "5";
const MIN_30 = "30";
const HR_1 = "60";
const HR_24 = "1440";
const job = new cron_1.CronJob("*/2 * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(new Date());
    yield (0, fetchFromDB_1.fetchFromDB)(MIN_1);
}));
const job1 = new cron_1.CronJob("0 */5 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, fetchFromDB_1.fetchFromDB)(MIN_5);
}));
const job2 = new cron_1.CronJob("0 */30 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, fetchFromDB_1.fetchFromDB)(MIN_30);
}));
const job3 = new cron_1.CronJob("0 0 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, fetchFromDB_1.fetchFromDB)(HR_1);
}));
const job4 = new cron_1.CronJob("0 0 12 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, fetchFromDB_1.fetchFromDB)(HR_24);
}));
job.start();
job1.start();
job2.start();
job3.start();
job4.start();
