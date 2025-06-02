import { createClient } from "redis";
import { responseDB } from "./lib/responseDB";
import { alertHandler } from "./lib/alertHandler";

const redisClient = createClient();

async function handleDbQueue() {
  while (true) {
    try {
      const res = await redisClient.brPop("db_process", 0);
      if (res?.element) {
        const data = JSON.parse(res.element);
        await responseDB(data.data);
      }
    } catch (error) {
      console.error("DB Worker Error:", error);
    }
  }
}

async function handleAlertQueue() {
  while (true) {
    try {
      const res = await redisClient.brPop("alert_process", 0);
      if (res?.element) {
        const data = JSON.parse(res.element);
        await alertHandler(data.data);
      }
    } catch (error) {
      console.error("Alert Worker Error:", error);
    }
  }
}

async function main() {
  await redisClient.connect();
  console.log("Redis connected");
  handleDbQueue();
  handleAlertQueue();
}

main().catch((err) => {
  console.error("Fatal Worker Error:", err);
});
