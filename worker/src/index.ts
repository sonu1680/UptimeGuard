import {createClient} from "redis";
import { checkStatus } from "./lib/checkStatus";
import dotenv from "dotenv"
dotenv.config()
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

  redisClient.on("error", (err: any) =>
    console.log("Redis Client Error", err)
  );

console.log("connected")
  while (true) {
    const res = await redisClient.rPop("message");
    if (res) {
      try {
        
        const data = JSON.parse(res);
        const response=await checkStatus(data);
        await redisClient.publish(response.batchId,JSON.stringify(response))
        
      } catch (error) {
       // console.error("Error parsing message:", error);
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}

main().catch((err) => {
  console.error("Error in worker:", err);
});
