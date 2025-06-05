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
exports.checkStatus = void 0;
const axios_1 = __importDefault(require("axios"));
const checkStatus = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const batchId = data.batchId;
    const results = yield Promise.allSettled(data.data.map((site) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const start = performance.now();
        try {
            const res = yield axios_1.default.get(site.url, { timeout: 5000 });
            return {
                url: site.url,
                monitorId: site.monitorId,
                checkInterval: site.checkInterval,
                responseTime: (performance.now() - start).toFixed(2).toString(),
                checkAt: new Date(),
                responseCode: res.status.toString(),
                status: "online",
            };
        }
        catch (error) {
            return {
                url: site.url,
                monitorId: site.monitorId,
                checkInterval: site.checkInterval,
                responseTime: (performance.now() - start).toFixed(2),
                checkAt: new Date(),
                responseCode: ((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) === null || _b === void 0 ? void 0 : _b.toString()) || "N/A",
                status: "offline",
                error: (error === null || error === void 0 ? void 0 : error.message) || "Unknown error",
            };
        }
    })));
    const sites = results.map((result) => result.status === "fulfilled"
        ? result.value
        : {
            url: "unknown",
            monitorId: "unknown",
            checkInterval: "unknown",
            responseTime: "0",
            checkAt: Date.now().toString(),
            responseCode: "N/A",
            status: "offline",
            error: "Unhandled rejection",
        });
    return {
        batchId,
        sites,
    };
});
exports.checkStatus = checkStatus;
