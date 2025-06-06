import { createClient, RedisClientType } from "redis";
import { dataFromWorker, sendToWorker } from "../types";
import { SITE_DOWN_CODE_RANGE } from "../constant";

export class RedisManager {
  private client: RedisClientType;
  private publisher: RedisClientType;
  private static instance: RedisManager;

  constructor() {
    this.client = createClient();
    this.client.connect();

    this.publisher = createClient();
    this.publisher.connect();
    this.publisher.on("error", (err: any) =>
      console.log("Redis Client Error", err)
    );
    console.log("Redis connected");
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
        console.log(JSON.parse(data))
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
