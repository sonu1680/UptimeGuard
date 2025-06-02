import axios from "axios";
import {createClient} from "redis";
import { checkStatus } from "./lib/checkStatus";

const redisClient = createClient();

async function main() {
  await redisClient.connect();
console.log("connected")
  while (true) {
    const res = await redisClient.rPop("message");
    if (res) {
      try {
        const data = JSON.parse(res);
        const response=await checkStatus(data);
        await redisClient.publish(response.batchId,JSON.stringify(response))
        
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}

main().catch((err) => {
  console.error("Error in worker:", err);
});
