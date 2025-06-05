import { createClient } from "redis";
import { checkStatus } from "./lib/checkStatus";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  username: process.env.REDIS_USERNAME!,
  password: process.env.REDIS_PASSWORD!,
  socket: {
    host: "redis-17571.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 17571,
  },
});

async function main() {
  await redisClient.connect();

  redisClient.on("error", (err: any) => console.log("Redis Client Error", err));

  console.log("connected");

  while (true) {
    try {
      const res = await redisClient.brPop("message", 0); 

      if (res?.element) {

        const data = JSON.parse(res.element);
        const response = await checkStatus(data);
        await redisClient.publish(response.batchId, JSON.stringify(response));
      }
    } catch (error) {
      console.error("Worker error:", error);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // optional cooldown
    }
  }
}

main().catch((err) => {
  console.error("Error in worker:", err);
});
