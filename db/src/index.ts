import { createClient, RedisClientType } from "redis";
import { responseDB } from "./lib/responseDB";
import dotenv from "dotenv";

dotenv.config();

const redisClient: RedisClientType = createClient({

  socket: {
    host: "redis",
    port: 6379,
  },
});


async function main() {
  try {
    redisClient.on("error", (err: any) =>
      console.log("Redis Client Error", err)
    );
    await redisClient.connect();
    console.log("Redis connected");
    while (true) {
      try {
        const res = await redisClient.brPop("db_process", 0);
        if (res?.element) {
          const data = JSON.parse(res.element);
          await responseDB(data.data);
        }
      } catch (err) {
        console.error("DB Process Error:", err);
      }
    }
  } catch (err) {
    console.error("Fatal Worker Error:", err);
  }
}




main().catch(() => {

});
