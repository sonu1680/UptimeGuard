import { createClient, RedisClientType } from "redis";
import { checkStatus } from "./lib/checkStatus";
import dotenv from "dotenv";
dotenv.config();

const redisClient: RedisClientType = createClient();

async function main() {
  redisClient.on("error", (err: any) => console.log("Redis Client Error", err));
  await redisClient.connect();
  console.log("connected");

  while (true) {
    const res = await redisClient.brPop("message", 0);
    if (res?.element) {
      try {
        const data = JSON.parse(res?.element);
        const response = await checkStatus(data);
        await redisClient.publish(response.batchId, JSON.stringify(response));
      } catch (error) {}
    }
  }
}

main().catch((err) => {
  console.error("Error in worker:", err);
});
