import { createClient, RedisClientType } from "redis";
import { responseDB } from "./lib/responseDB";
import { alertHandler } from "./lib/alertHandler";

const redisClient: RedisClientType = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD!,
  socket: {
    host: "redis-17571.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 17571,
  },
});

async function main() {
  try {
    await redisClient.connect();
    redisClient.on("error", (err:any) => console.log("Redis Client Error", err));
    console.log("Redis connected");
     while(true){
      const res = await redisClient.rPop("db_process");
      if (res) {
        const data = JSON.parse(res);
        await responseDB(data.data);
      }

      const res1 = await redisClient.rPop("alert_process");
      if (res1) {
        const data = JSON.parse(res1);
        await alertHandler(data.data);
      }
    
   }


  } catch (err) {
    console.error("Fatal Worker Error:", err);
  }
}

main();
