import { CronJob } from "cron";
import { fetchFromDB } from "./lib/fetchFromDB";

const MIN_1 = "1";
const MIN_5 = "5";
const MIN_30 = "30";
const HR_1 = "60";
const HR_24 = "1440";


const job = new CronJob("0 * * * * *", async () => {
  await fetchFromDB(MIN_1);
});

const job1 = new CronJob("0 */5 * * * *", async () => {
  await fetchFromDB(MIN_5);
});
const job2 = new CronJob("0 */30 * * * *", async () => {
  await fetchFromDB(MIN_30);
});
const job3 = new CronJob("0 0 * * * *", async () => {
  await fetchFromDB(HR_1);
});
const job4 = new CronJob("0 0 12 * * *", async () => {
  await fetchFromDB(HR_24);
});

job.start();
job1.start();
job2.start();
job3.start();
job4.start();
