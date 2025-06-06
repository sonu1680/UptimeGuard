import { bot } from "./telegramInstance";


process.on("SIGINT", () => {
  console.log("Stopping Telegram bot polling...");
  bot.stopPolling().then(() => {
    console.log("Bot polling stopped");
    process.exit(0);
  });
});
process.on("SIGTERM", () => {
  console.log("Stopping Telegram bot polling...");
  bot.stopPolling().then(() => {
    console.log("Bot polling stopped");
    process.exit(0);
  });
});


export const sendToTelegram = async (chatId: string,msg:string) => {
  try {
    await bot.sendMessage(chatId, msg);
return 200;
    //console.log(`Message sent to chat ID ${chatId}`);
  } catch (error) {
    return 500
    //console.error("Error sending Telegram message:", error);
  }
};




bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Welcome to UptimeGuard!, Here is your chat ID:${chatId} and start watching your site :)`);
 
});
