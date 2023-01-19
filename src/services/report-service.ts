import axios from "axios";
import { OceanData, AtmosphereData } from "@/types";

async function getReportToday() {
  const timestamp = Date.now();
  const time: string = timestamp.toString();
  const oceanData = await getOceanData(time);
  const atmosphereData = await getAtmosphereData(time);
  const lastOceanData = oceanData.slice(-1)[0];
  const lastAtmosphereData = atmosphereData.slice(-1)[0];
  return createOceanReport(lastOceanData) + createAtmosphereReport(lastAtmosphereData);
}

function createOceanReport(data: OceanData) {
  let report = `Olá, Cláudio! \n Seguem as condições oceânicas:`;
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

function checkTemperatureCondition(temperature: number) {
  if (temperature >= 21) return `\n A temperatura da água está quente e se encontra em ${temperature} °C.`;
  if (temperature > 18 && temperature < 21) return `\n A temperatura da água está um pouco gelada e se encontra em ${temperature} °C.`;
  if (temperature < 18 && temperature >= 16) return `\n A temperatura da água está bem gelada e se encontra em ${temperature} °C.`;
  if (temperature < 16) return `\n A temperatura da água está muito gelada e se encontra em é ${temperature} °C.`;
}

function checkWaveCondition(wave: number) {
  if (wave <= 0.50) return ` \n O mar está muito calmo, com ondas em torno de ${wave} metros.`;
  if (wave > 0.50 && wave <= 0.75) return ` \n O mar está levemente ondulado, com ondas em torno de ${wave} metros.`;
  if (wave > 0.75 && wave <= 1.0) return ` \n O mar está com pequenas ondulações em torno de ${wave} metros.`;
  if (wave > 1.0 && wave <= 1.25) return ` \n O mar está com ondulações um pouco altas, em torno de ${wave} metros.`;
  if (wave > 1.25 && wave <= 1.50) return ` \n O mar está com ondulações altas, em torno de ${wave} metros.`;
  if (wave > 1.50 && wave <= 2.0) return ` \n O mar está com um grau alto de agitação, com ondas em torno de ${wave} metros.`;
  if (wave > 2.00 && wave <= 2.5) return ` \n O mar está de ressaca, com ondas em torno de ${wave} metros. Se atente aos avisos dos bombeiros.`;
  if (wave > 2.5 && wave <= 3.0) return ` \n O mar está de ressaca forte, com ondas muito altas em torno de ${wave} metros. Se atente aos avisos dos bombeiros.`;
  if (wave > 3.0 && wave <= 3.5) return ` \n Alerta! O mar está de ressaca muito forte, com ondas muito altas em torno de ${wave} metros. Evite ir a praia.`;
  if (wave > 4.0) return ` \n Alerta vermelho! O mar está de ressaca muito forte, com ondas muito altas em torno de ${wave} metros. Evite ir a praia.`;
}

function checkWindSpeedCondition(wind: number) {
  wind = wind * 1.8;
  if (wind <= 5.0) return ` \n Hoje está praticamente sem vento, em torno de ${wind} Km/h.`;
  if (wind > 5.0 && wind <= 10.0) return ` \n Hoje está com uma brisa muito leve, em torno de ${wind} Km/h.`;
  if (wind > 10.0 && wind <= 15.0) return ` \n Hoje está com uma brisa leve, em torno de ${wind} Km/h.`;
  if (wind > 15.0 && wind <= 20.0) return ` \n Hoje está com ventos fracos, em torno de ${wind} Km/h, podendo ter rajadas mais fortes`;
  if (wind > 20.0 && wind <= 30.0) return ` \n Hoje está com ventos de intensidade fraca a mediana, em torno de ${wind} Km/h, podendo ter rajadas mais fortes`;
  if (wind > 30.0 && wind <= 40.0) return ` \n Hoje está com ventos de intensidade mediana, em torno de ${wind} Km/h, podendo ter rajadas mais fortes`;
  if (wind > 40.0 && wind <= 50.0) return ` \n Hoje está com ventos de intensidade mediana a forte, em torno de ${wind} Km/h, podendo ter rajadas mais fortes`;
  if (wind > 50.0 && wind <= 60.0) return ` \n Hoje está com ventos de intensidade forte, em torno de ${wind} Km/h, podendo ter rajadas mais fortes`;
  if (wind > 60.0 && wind <= 70.0) return ` \n Hoje está com ventos de intensidade muito fortes, em torno de ${wind} Km/h, podendo ter rajadas ainda mais fortes`;
  if (wind > 70.0 && wind <= 80.0) return ` \n Alerta! Hoje está com ventos de intensidade muito fortes, em torno de ${wind} Km/h, podendo ter rajadas ainda mais fortes`;
  if (wind > 80.0 && wind <= 90.0) return ` \n Alerta de vendaval! Hoje está com ventos de intensidade fortíssima, em torno de ${wind} Km/h, podendo ter rajadas ainda mais fortes`;
  if (wind > 90.0 && wind <= 100.0) return ` \n Alerta de tempestade ou ciclone extratropical! Hoje está com ventos de intensidade fortíssima, em torno de ${wind} Km/h, podendo ter rajadas ainda mais fortes`;
  if (wind > 100.0) return ` \n Alerta de ciclone tropical! Hoje está com ventos de intensidade fortíssima, em torno de ${wind} Km/h, podendo ter rajadas ainda mais fortes`;
}

const reportService = {
  getReportToday
};

export default reportService;
