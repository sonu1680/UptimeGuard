"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const TOKEN = process.env.TELEGRAM_TOKEN;
exports.bot = (_a = globalThis.telegramBot) !== null && _a !== void 0 ? _a : new node_telegram_bot_api_1.default(TOKEN, { polling: true });
if (process.env.NODE_ENV !== "production") {
    globalThis.telegramBot = exports.bot;
}
