import axios from "axios";
import { OceanData, AtmosphereData } from "@/types";
import { checkTemperatureCondition, checkWaveCondition, checkWindSpeedCondition } from "@/helpers/report-helpers";
import redis from "@/repositories/redis";

async function getReportToday() {
  const reportExistsOnRedis = redis.exists("report");
  if (reportExistsOnRedis) return redis.get("report");
  return "report nao atualizado";
}

async function generateReport() {
  const timestamp = Date.now();
  const time: string = timestamp.toString();
  const oceanData = await getOceanData(time);
  const atmosphereData = await getAtmosphereData(time);
  const lastOceanData = oceanData.slice(-1)[0];
  const lastAtmosphereData = atmosphereData.slice(-1)[0];
  const report = createOceanReport(lastOceanData) + createAtmosphereReport(lastAtmosphereData);
  redis.set("report", report);
  //console.log("Gerou um novo report " + lastOceanData.HOUR  + " horas" + " e " + lastOceanData.MINUTE + " minutos");
}
generateReport();
setInterval(generateReport, 3600000);

function createOceanReport(data: OceanData) {
  let report = "Olá, Cláudio! \n Seguem as condições oceânicas:";
  const { Avg_W_Tmp1 } = data;
  const { Hsig } = data;
  const waveCondition = checkWaveCondition(Number(Hsig));
  const temperatureCondition = checkTemperatureCondition(Number(Avg_W_Tmp1));
  report += waveCondition + temperatureCondition;
  return report;
}

function createAtmosphereReport(data: AtmosphereData) {
  let report = "\n Seguem as condições meteorológias:";
  const { Avg_Wnd_Sp } = data;
  const { Avg_Wnd_Dir_N } = data;
  const windSpeedCondition = checkWindSpeedCondition(Number(Avg_Wnd_Sp));
  const windDirectionCondition = "";
  report += windSpeedCondition;
  report += ` \n data: ${data.DAY}/${data.MONTH}/${data.YEAR} / hora: ${Number(data.HOUR) - 3}:${data.MINUTE}`;
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
