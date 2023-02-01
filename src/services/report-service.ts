import axios from "axios";
import { OceanData, AtmosphereData } from "@/types";
import { ReportObject } from "@/types";
import { sendEmail } from "@/helpers";
import usersRepository from "@/repositories/users-repository";
import checkReport from "@/helpers/report-helpers";
import Redis from "@/repositories/redis";
const redis = new Redis("report");

async function getReportToday() {
  const reportExistsOnRedis = redis.exists();
  
  if (reportExistsOnRedis) {
    const response = await redis.get();
    return JSON.parse(response);
  };
  return "report não atualizado";
}

async function generateReport(): Promise<void> {
  const date = new Date;
  const hour = date.getHours();
  const timestamp = Date.now();
  const time: string = timestamp.toString();
  const itsTimeSendEmail = hour == 5 || hour == 17;
  
  const oceanData = await getOceanData(time);
  const atmosphereData = await getAtmosphereData(time);
  const lastOceanData = oceanData.slice(-1)[0];
  const lastAtmosphereData = atmosphereData.slice(-1)[0];

  const report = generateReportObject(lastOceanData, lastAtmosphereData);
  redis.set(JSON.stringify(report));
  const email = generateEmailReport(report);
  
  if (itsTimeSendEmail) {
    const usersList = await usersRepository.findUsersWithReport();
    const emailsList = usersList.map((value) => value.email);
    //return sendEmail({emailsList, report});
  }
}
generateReport();
setInterval(generateReport, 3600000);

function generateReportObject(oceanData: OceanData, atmData: AtmosphereData): ReportObject {
  const { Avg_W_Tmp1 } = oceanData;
  const { Hsig } = oceanData;
  const { Avg_Wnd_Sp } = atmData;
  const check = new checkReport(Number(Avg_W_Tmp1), Number(Hsig), Number(Avg_Wnd_Sp));
  const waveCondition = check.waveConditions();
  const temperatureCondition = check.temperatureConditions();
  const windSpeedCondition = check.windConditions();
  const reportObject = {
    waveCondition,
    temperatureCondition,
    windSpeedCondition,
    date: `${atmData.DAY}/${atmData.MONTH}/${atmData.YEAR} `,
    hour: `${Number(atmData.HOUR) - 3}:${atmData.MINUTE}`
  }
  return reportObject;
}

function generateEmailReport(reportObject: ReportObject): string {
  let report = "Olá, Cláudio! \n Seguem as condições oceânicas:";
  report += reportObject.waveCondition;
  report += reportObject.temperatureCondition;
  report += "\n Seguem as condições meteorológias:";
  report += reportObject.windSpeedCondition;
  report += ` \n data: ${reportObject.date} / hora: ${reportObject.hour}`;
  return report;
}

async function getOceanData(time: string): Promise<OceanData[]> {
  const url = `https://micro-oceanreport-backend.vercel.app/ocean/${time.slice(0, -3)}`;
  return (await axios.get(url)).data;
}

async function getAtmosphereData(time: string) {
  const url = `https://micro-oceanreport-backend.vercel.app/atmosphere/${time.slice(0, -3)}`;
  return (await axios.get(url)).data;
}

const reportService = {
  getReportToday
};

export default reportService;
