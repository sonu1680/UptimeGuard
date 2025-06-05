type websites = {
  url: string;
  monitorId: string;
  checkInterval: string;
  responseTime?: string;
  responseCode?: string;
  checkAt?: Date;
  status?:string
};
export type dataFromEngine = {
  batchId: string;
  data: websites[];
};



export type resultFromWorker = {
  url: string;
  monitorId: string;
  checkInterval: string;
  responseTime: string;
  responseCode: string;
  checkAt: Date;
  status: "online"|"offline";
  error?:string
};
