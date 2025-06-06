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
exports.pushToDb = void 0;
const prisma_1 = require("./prisma");
const tryCathHandler_1 = require("./tryCathHandler");
const pushToDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    for (const site of data.sites) {
        if (site) {
            const res = yield (0, tryCathHandler_1.tryCatchHandler)(() => prisma_1.prisma.responseLog.create({
                data: {
                    monitorId: site.monitorId,
                    responseCode: site.responseCode,
                    responseTime: site.responseTime,
                    checkAt: site.checkAt,
                },
            }));
            console.log(res);
        }
    }
});
exports.pushToDb = pushToDb;
