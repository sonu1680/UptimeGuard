import { createClient, RedisClientType } from "redis";
import { alertHandler } from "./lib/alertHandler";
import dotenv from "dotenv";

dotenv.config();

const redisClient: RedisClientType = createClient({
  username: encodeURIComponent(process.env.REDIS_USERNAME || ""),
  password: encodeURIComponent(process.env.REDIS_PASSWORD || ""),
  socket: {
    host: "redis-17571.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 17571,
  },
});


async function processAlertQueue() {
  while (true) {
    try {
      const res = await redisClient.brPop("alert_process", 0);
      if (res?.element) {
        console.log(res)
        const data = JSON.parse(res.element);
        await alertHandler(data.data);
      }
    } catch (err) {
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


main().catch(() => {

});
