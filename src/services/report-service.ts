import axios from "axios";
import { OceanData } from "@/types";

async function getReportToday() {
  const data = await getData();
  const lastData = data.slice(-1)[0];
  return createReport(lastData);
}

function createReport(data: OceanData) {
  let report = `Olá, Cláudio!
                    Seguem as condições oceânicas.
                    `;
  const { Avg_W_Tmp1 } = data;
  const { Hsig } = data;
  const temperatureCondition = checkTemperatureCondition(Number(Avg_W_Tmp1));
  const waveCondition = checkWaveCondition(Number(Hsig));
  report += waveCondition;
  report += temperatureCondition;
  report += ` \n data: ${data.DAY}/${data.MONTH}/${data.YEAR} / hora: ${data.HOUR}:${data.MINUTE}`;
  return report;
}

function checkTemperatureCondition(temperature: number) {
  if (Number(temperature) >= 21) return `\n A temperatura da água está quente e se encontra em ${temperature} °C, `;
  if (Number(temperature) > 18 && Number(temperature) < 21) return `\n A temperatura da água está um pouco gelada e se encontra em é ${temperature} °C`;
  if (Number(temperature) < 18 && Number(temperature) >= 16) return `\n A temperatura da água está bem gelada e se encontra em é ${temperature} °C`;
  if (Number(temperature) < 16) return `\n A temperatura da água está muito gelada e se encontra em é ${temperature} °C`;
}

function checkWaveCondition(wave: number) {
  if (Number(wave) <= 0.75) return ` O mar está flat, com ondas em torno de ${wave} metros`;
}

async function getData(): Promise<OceanData[]> {
  const timestamp = Date.now();
  const time: string = timestamp.toString();
  const url = `https://micro-oceanreport-backend.vercel.app/waves/${time.slice(0, -3)}`;
  return (await axios.get(url)).data;
}

const reportService = {
  getReportToday
};

export default reportService;

