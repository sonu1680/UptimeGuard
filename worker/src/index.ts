import { createClient, RedisClientType } from "redis";
import { checkStatus } from "./lib/checkStatus";
import dotenv from"dotenv"
dotenv.config();

const redisClient: RedisClientType = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-17571.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 17571,
  },
});

async function main() {
  redisClient.on("error", (err: any) => console.log("Redis Client Error", err));
  await redisClient.connect();
  console.log("connected");
  
  while (true) {
    
    const res = await redisClient.brPop("message",0);
    if (res?.element) {
      try {
        const data = JSON.parse(res?.element);
        const response = await checkStatus(data);
       const a= await redisClient.publish(response.batchId, JSON.stringify(response));
      } catch (error) {
      }
    } else {
    }
  }
}


async function shutdown() {
  console.log("Shutting down...");
  await redisClient.quit();
  console.log("Redis disconnected");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

main().catch((err) => {
  console.error("Error in worker:", err);
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
});

