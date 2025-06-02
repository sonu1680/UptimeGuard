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
exports.sendToTelegram = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
const sendToTelegram = (chatId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bot.sendMessage(chatId, "site is down");
        console.log(`Message sent to chat ID ${chatId}`);
    }
    catch (error) {
        console.error("Error sending Telegram message:", error);
    }
});
exports.sendToTelegram = sendToTelegram;
bot.onText(/\/id/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Your chat ID is: ${chatId}`);
});
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Thanks, got your message!, we are watching your site :)");
});
