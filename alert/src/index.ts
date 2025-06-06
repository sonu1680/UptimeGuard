import { createClient, RedisClientType } from "redis";
import { alertHandler } from "./lib/alertHandler";
import dotenv from "dotenv";

dotenv.config();

const redisClient: RedisClientType = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-17571.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 17571,
  },
});

let isShuttingDown = false;

async function processAlertQueue() {
  while (true) {
    try {
      const res = await redisClient.brPop("alert_process", 0);
      if (res?.element) {
        const data = JSON.parse(res.element);
        await alertHandler(data.data);
      }
    } catch (err) {
      if (isShuttingDown) break;
      console.error("Alert Process Error:", err);
    }
  }
}

async function main() {
  try {
    redisClient.on("error", (err: any) =>
      console.log("Redis Client Error", err)
    );
    await redisClient.connect();
    console.log("Redis connected");
    processAlertQueue();
  } catch (err) {
    console.error("Fatal Worker Error:", err);
  }
}

async function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log("Shutting down...");
  try {
    await redisClient.quit();
    console.log("Redis disconnected");
  } catch (err) {
    console.error("Error during Redis quit:", err);
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

main().catch(() => {
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
});
