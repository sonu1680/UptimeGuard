import { createClient } from "redis";
import { responseDB } from "./lib/responseDB";
import { alertHandler } from "./lib/alertHandler";

const redisClient = createClient();

async function main() {
  try {
    await redisClient.connect();
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
