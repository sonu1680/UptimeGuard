import axios from "axios";
import { dataFromEngine, resultFromWorker } from "../types";

export const checkStatus = async (data: dataFromEngine) => {

  const batchId = data.batchId;
  const results = await Promise.allSettled(
    data.data.map(async (site): Promise<resultFromWorker> => {
      const start = performance.now();
      try {
        const res = await axios.get(site.url, { timeout: 5000 });
        return {
          url: site.url,
          monitorId: site.monitorId,
          checkInterval: site.checkInterval,
          responseTime: (performance.now() - start).toFixed(2).toString(),
          checkAt: new Date(),
          responseCode: res.status.toString(),
          status: "online",
        };
      } catch (error: any) {
        return {
          url: site.url,
          monitorId: site.monitorId,
          checkInterval: site.checkInterval,
          responseTime: (performance.now() - start).toFixed(2),
          checkAt: new Date(),
          responseCode: error?.response?.status?.toString() || "N/A",
          status: "offline",
          error: error?.message || "Unknown error",
        };
      }
    })
  );

  const sites = results.map((result) =>
    result.status === "fulfilled"
      ? result.value
      : {
          url: "unknown",
          monitorId: "unknown",
          checkInterval: "unknown",
          responseTime: "0",
          checkAt: Date.now().toString(),
          responseCode: "N/A",
          status: "offline",
          error: "Unhandled rejection",
        }
  );
  return {
    batchId,
    sites,
  };
};
