export type sendToWorker = {
  url: string;
  monitorId: string;
  checkInterval: string;
};

export type resultFromWorker = {
  url: string;
  monitorId: string;
  checkInterval: string;
  responseTime:string,
  responseCode:string,
  checkAt:Date,
  

};


type websites = {
  url: string;
  monitorId: string;
  checkInterval: string;
  responseTime: string;
  responseCode: string;
  checkAt: Date;
  status:string
};
export type dataFromWorker = {
  batchId: string;
  sites: websites[];
};

