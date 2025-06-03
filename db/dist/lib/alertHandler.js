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
exports.alertHandler = void 0;
const prisma_1 = require("./prisma");
const sendMail_1 = require("./sendMail");
const sendTelegram_1 = require("./sendTelegram");
const tryCathHandler_1 = require("./tryCathHandler");
const MESSAGE = "your site is down plz update it";
const alertHandler = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data) {
        const alertMode = yield (0, tryCathHandler_1.tryCatchHandler)(() => prisma_1.prisma.notification.findMany({
            where: {
                monitorId: data.monitorId,
            },
        }));
        if (alertMode.data) {
            if (alertMode.data[0].emailId) {
                const response = yield (0, sendMail_1.sendMail)(alertMode.data[0].emailId, MESSAGE);
                if (response == 200) {
                    yield (0, tryCathHandler_1.tryCatchHandler)(() => prisma_1.prisma.alertLog.create({
                        data: {
                            monitorId: data.monitorId,
                            sentAt: new Date(),
                            msg: MESSAGE,
                            alertType: "EMAIL",
                        },
                    }));
                    console.log("alert sent to mail");
                }
            }
            if (alertMode.data[0].telegramId) {
                const response = yield (0, sendTelegram_1.sendToTelegram)(alertMode.data[0].telegramId, MESSAGE);
                if (response == 200) {
                    yield (0, tryCathHandler_1.tryCatchHandler)(() => prisma_1.prisma.alertLog.create({
                        data: {
                            monitorId: data.monitorId,
                            sentAt: new Date(),
                            msg: MESSAGE,
                            alertType: "TELEGRAM",
                        },
                    }));
                    console.log("alert sent to telegram");
                }
            }
        }
    }
});
exports.alertHandler = alertHandler;
