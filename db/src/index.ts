import { createClient } from "redis";
import { responseDB } from "./lib/responseDB";
import { alertHandler } from "./lib/alertHandler";

const redisClient = createClient();

async function main() {
  try {
    await redisClient.connect();
    console.log("Redis connected");
     while(true){
      const res = await redisClient.brPop("db_process", 0);
      if (res?.element) {
        const data = JSON.parse(res.element);
        await responseDB(data.data);
      }

      const res1 = await redisClient.brPop("alert_process", 0);
      if (res1?.element) {
        const data = JSON.parse(res1.element);
        await alertHandler(data.data);
      }
    
   }


  } catch (err) {
    console.error("Fatal Worker Error:", err);
  }
}

main();
