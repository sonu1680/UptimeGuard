export type websites = {
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
  sites: websites[];
};



export type alertMethod={
  id:string,
  emailId?:string,
  telegramId?:string
  monitorId:string,
}