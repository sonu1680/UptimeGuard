import { createClient, RedisClientType } from "redis";
import { checkStatus } from "./lib/checkStatus";
import dotenv from "dotenv";

dotenv.config();

const redisPublisher: RedisClientType = createClient({
  username: process.env.REDIS_USERNAME!,
  password: process.env.REDIS_PASSWORD!,
  socket: {
    host: "redis-17571.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 17571,
  },
});

const redisSubscriber: RedisClientType = createClient({
  username: process.env.REDIS_USERNAME!,
  password: process.env.REDIS_PASSWORD!,
  socket: {
    host: "redis-17571.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 17571,
  },
});

async function main() {
  
  redisPublisher.on("error", (err: any) =>
    console.log("Redis Client Error", err)
);
redisSubscriber.on("error", (err: any) =>
  console.log("Redis Client Error", err)
);
await redisPublisher.connect();
  await redisSubscriber.connect();

 

  console.log("connected");

  while (true) {
    try {
      const res = await redisSubscriber.brPop("message", 0);
      if (res?.element) {
        const data = JSON.parse(res.element);
        const response = await checkStatus(data);
        await redisPublisher.publish(
          response.batchId,
          JSON.stringify(response)
        );
      }
    } catch (error) {
      console.error("Worker error:", error);
    }
  }
}

main().catch((err) => {
  console.error("Error in worker:", err);
});
