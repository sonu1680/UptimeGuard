
import TelegramBot from "node-telegram-bot-api";

const TOKEN = process.env.TELEGRAM_TOKEN!;
const bot = new TelegramBot(TOKEN, { polling: true });

export const sendToTelegram = async (chatId: string) => {
  try {
    await bot.sendMessage(chatId, "site is down");

    console.log(`Message sent to chat ID ${chatId}`);
  } catch (error) {
    console.error("Error sending Telegram message:", error);
  }
};


bot.onText(/\/id/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Your chat ID is: ${chatId}`);
});
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Thanks, got your message!, we are watching your site :)");
 
});
