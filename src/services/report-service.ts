import axios from "axios";
import { OceanData, AtmosphereData } from "@/types";
import { checkTemperatureCondition, checkWaveCondition, checkWindSpeedCondition } from "@/helpers/report-helpers";
import redis from "@/repositories/redis";
import { ReportObject } from "@/types";

async function getReportToday() {
  const reportExistsOnRedis = redis.exists("report");
  
  if (reportExistsOnRedis) {
    const response = await redis.get("report");
    return JSON.parse(response);
  };
  return "report nao atualizado";
}

async function generateReport(): Promise<void> {
  const timestamp = Date.now();
  const time: string = timestamp.toString();
  const oceanData = await getOceanData(time);
  const atmosphereData = await getAtmosphereData(time);
  const lastOceanData = oceanData.slice(-1)[0];
  const lastAtmosphereData = atmosphereData.slice(-1)[0];
  const report = generateReportObject(lastOceanData, lastAtmosphereData);
  redis.set("report", JSON.stringify(report));
  const email = generateEmailReport(report);
  //console.log(email);
}
generateReport();
setInterval(generateReport, 3600000);

function generateReportObject(oceanData: OceanData, atmData: AtmosphereData): ReportObject {
  const { Avg_W_Tmp1 } = oceanData;
  const { Hsig } = oceanData;
  const { Avg_Wnd_Sp } = atmData;
  const waveCondition = checkWaveCondition(Number(Hsig));
  const temperatureCondition = checkTemperatureCondition(Number(Avg_W_Tmp1));
  const windSpeedCondition = checkWindSpeedCondition(Number(Avg_Wnd_Sp));
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
