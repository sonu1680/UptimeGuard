import { createClient, RedisClientType } from "redis";
import { responseDB } from "./lib/responseDB";
import { alertHandler } from "./lib/alertHandler";

const redisClient: RedisClientType = createClient({
  username: process.env.REDIS_USERNAME!,
  password: process.env.REDIS_PASSWORD!,
  socket: {
    host: "redis-17571.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 17571,
  },
});

async function processDBQueue() {
  while (true) {
    const res = await redisClient.brPop("db_process", 0);
    if (res?.element) {
      try {
        const data = JSON.parse(res.element);
        await responseDB(data.data);
      } catch (err) {
        console.error("DB Process Error:", err);
      }
    }
  }
}

async function processAlertQueue() {
  
  while (true) {
    const res = await redisClient.brPop("alert_process", 0);
    if (res?.element) {
      try {
        const data = JSON.parse(res.element);
        await alertHandler(data.data);
      } catch (err) {
        console.error("Alert Process Error:", err);
      }
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
    await Promise.all([processDBQueue(), processAlertQueue()]);
  } catch (err) {
    console.error("Fatal Worker Error:", err);
  }
}

main();
