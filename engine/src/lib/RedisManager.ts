import { createClient, RedisClientType } from "redis";
import { dataFromWorker, sendToWorker } from "../types";
import { SITE_DOWN_CODE_RANGE } from "../constant";

export class RedisManager {
  private client: RedisClientType;
  private publisher: RedisClientType;
  private static instance: RedisManager;
  private isRedisConnected1: boolean = false;
  private isRedisConnected2: boolean = false;

  constructor() {
    this.client = createClient({
      username: encodeURIComponent(process.env.REDIS_USERNAME || ""),
      password: encodeURIComponent(process.env.REDIS_PASSWORD || ""),
      socket: {
        host: "redis-17571.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
        port: 17571,
      },
    });

    this.publisher = createClient({
      username: encodeURIComponent(process.env.REDIS_USERNAME || ""),
      password: encodeURIComponent(process.env.REDIS_PASSWORD || ""),
      socket: {
        host: "redis-17571.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
        port: 17571,
      },
    });

    this.client.connect().then((e) => {
      console.log(e)
      this.isRedisConnected1 = true;

      console.log("Redis 1 connected");
    });

    this.publisher.connect().then(() => {
      this.isRedisConnected2 = true;

      console.log("Redis 2 connected");
    });
    this.publisher.on("error", (err: any) =>
      console.log("Redis Client Error", err)
    );
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RedisManager();
    }
    return this.instance;
  }

  public sendToWorker(websites: sendToWorker[]): Promise<dataFromWorker> {
    const id = this.randomId();
    return new Promise<dataFromWorker>((resolve) => {
      this.client.subscribe(id, (data) => {
        this.client.unsubscribe(id);
        this.sendToDB(JSON.parse(data));
        this.sendAlert(JSON.parse(data));
        //console.log(JSON.parse(data));
        resolve(JSON.parse(data));
      });

      this.publisher.lPush(
        "message",
        JSON.stringify({ batchId: id, data: websites })
      );
    });
  }

  public sendToDB(data: dataFromWorker) {
    this.publisher.lPush(
      "db_process",
      JSON.stringify({ batchId: data.batchId, data: data })
    );
  }

  public sendAlert(data: dataFromWorker) {
    for (const site of data.sites) {
      if (site && site.responseCode) {
        const code = parseInt(site.responseCode);
        if (!isNaN(code) && code >= SITE_DOWN_CODE_RANGE) {
          const id = this.randomId();
          this.publisher.lPush(
            "alert_process",
            JSON.stringify({ id: id, data: site })
          );
        }
      }
    }
  }

  public randomId() {
    return (
      Math.random().toString().substring(2, 16) +
      Math.random().toString().substring(2, 16)
    );
  }
}
