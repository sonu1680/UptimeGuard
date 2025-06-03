import { createClient, RedisClientType } from "redis";

export class RedisManager {
  private client: RedisClientType;
  private publisher: RedisClientType;
  private static instance: RedisManager;

  constructor() {
    this.client = createClient();
    this.client.connect();

    this.publisher = createClient();
    this.publisher.connect();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RedisManager();
    }
    return this.instance;
  }

  public sendAndAwait(monitoringId: string, url: string) {
    return new Promise<any>((resolve) => {
      this.client.subscribe(monitoringId, (data) => {
        this.client.unsubscribe(monitoringId);
        resolve(JSON.parse(data));
      });

      this.publisher.lPush(
        "message",
        JSON.stringify({ monitoringId: monitoringId, data: url })
      );
    });
  }
}
