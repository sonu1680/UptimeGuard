import TelegramBot from "node-telegram-bot-api";

const TOKEN = process.env.TELEGRAM_TOKEN!;
declare global {

  var telegramBot: TelegramBot | undefined;
}

export const bot =
  globalThis.telegramBot ?? new TelegramBot(TOKEN, { polling: true });

if (process.env.NODE_ENV !== "production") {
  globalThis.telegramBot = bot;
}
