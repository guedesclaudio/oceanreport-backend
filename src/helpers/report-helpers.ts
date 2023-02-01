export default class checkReport {
    private temperature: number;
    private wave: number;
    private wind: number;

    constructor(temperature: number, wave: number, wind: number) {
      this.temperature = temperature;
      this.wave = wave;
      this.wind = wind;
    }

    temperatureConditions(): string {
      if (this.temperature === null) return "\n Infelizmente não foi possível ter acesso aos dados de temperatura da água do mar";
      if (this.temperature >= 21) return `\n A temperatura da água está quente e se encontra em ${this.temperature} °C.`;
      if (this.temperature > 18 && this.temperature < 21) return `\n A temperatura da água está um pouco gelada e se encontra em ${this.temperature} °C.`;
      if (this.temperature < 18 && this.temperature >= 16) return `\n A temperatura da água está bem gelada e se encontra em ${this.temperature} °C.`;
      if (this.temperature < 16) return `\n A temperatura da água está muito gelada e se encontra em é ${this.temperature} °C.`;
    }

    waveConditions(): string {
      if (this.wave === null) return "\n Infelizmente não foi possível ter acesso aos dados de altura de onda do mar";
      if (this.wave <= 0.50) return ` \n O mar está muito calmo, com ondas em torno de ${this.wave} metros.`;
      if (this.wave > 0.50 && this.wave <= 0.75) return ` \n O mar está levemente ondulado, com ondas em torno de ${this.wave} metros.`;
      if (this.wave > 0.75 && this.wave <= 1.0) return ` \n O mar está com pequenas ondulações em torno de ${this.wave} metros.`;
      if (this.wave > 1.0 && this.wave <= 1.25) return ` \n O mar está com ondulações um pouco altas, em torno de ${this.wave} metros.`;
      if (this.wave > 1.25 && this.wave <= 1.50) return ` \n O mar está com ondulações altas, em torno de ${this.wave} metros.`;
      if (this.wave > 1.50 && this.wave <= 2.0) return ` \n O mar está com um grau alto de agitação, com ondas em torno de ${this.wave} metros.`;
      if (this.wave > 2.00 && this.wave <= 2.5) return ` \n O mar está de ressaca, com ondas em torno de ${this.wave} metros. Se atente aos avisos dos bombeiros.`;
      if (this.wave > 2.5 && this.wave <= 3.0) return ` \n O mar está de ressaca forte, com ondas muito altas em torno de ${this.wave} metros. Se atente aos avisos dos bombeiros.`;
      if (this.wave > 3.0 && this.wave <= 3.5) return ` \n Alerta! O mar está de ressaca muito forte, com ondas muito altas em torno de ${this.wave} metros. Evite ir a praia.`;
      if (this.wave > 4.0) return ` \n Alerta vermelho! O mar está de ressaca muito forte, com ondas muito altas em torno de ${this.wave} metros. Evite ir a praia.`;
    }

    windConditions(): string {
      if (this.wind === null) return "\n Infelizmente não foi possível ter acesso aos dados de velocidade do vento";
      this.wind = (this.wind * 1.8);
      
      if (this.wind <= 5.0) return ` \n Hoje está praticamente sem vento, em torno de ${this.wind.toFixed(2)} Km/h.`;
      if (this.wind > 5.0 && this.wind <= 10.0) return ` \n Hoje está com uma brisa muito leve, em torno de ${this.wind.toFixed(2)} Km/h.`;
      if (this.wind > 10.0 && this.wind <= 15.0) return ` \n Hoje está com uma brisa leve, em torno de ${this.wind.toFixed(2)} Km/h.`;
      if (this.wind > 15.0 && this.wind <= 20.0) return ` \n Hoje está com ventos fracos, em torno de ${this.wind.toFixed(2)} Km/h, podendo ter rajadas mais fortes`;
      if (this.wind > 20.0 && this.wind <= 30.0) return ` \n Hoje está com ventos de intensidade fraca a mediana, em torno de ${this.wind.toFixed(2)} Km/h, podendo ter rajadas mais fortes`;
      if (this.wind > 30.0 && this.wind <= 40.0) return ` \n Hoje está com ventos de intensidade mediana, em torno de ${this.wind.toFixed(2)} Km/h, podendo ter rajadas mais fortes`;
      if (this.wind > 40.0 && this.wind <= 50.0) return ` \n Hoje está com ventos de intensidade mediana a forte, em torno de ${this.wind.toFixed(2)} Km/h, podendo ter rajadas mais fortes`;
      if (this.wind > 50.0 && this.wind <= 60.0) return ` \n Hoje está com ventos de intensidade forte, em torno de ${this.wind.toFixed(2)} Km/h, podendo ter rajadas mais fortes`;
      if (this.wind > 60.0 && this.wind <= 70.0) return ` \n Hoje está com ventos de intensidade muito fortes, em torno de ${this.wind.toFixed(2)} Km/h, podendo ter rajadas ainda mais fortes`;
      if (this.wind > 70.0 && this.wind <= 80.0) return ` \n Alerta! Hoje está com ventos de intensidade muito fortes, em torno de ${this.wind.toFixed(2)} Km/h, podendo ter rajadas ainda mais fortes`;
      if (this.wind > 80.0 && this.wind <= 90.0) return ` \n Alerta de vendaval! Hoje está com ventos de intensidade fortíssima, em torno de ${this.wind.toFixed(2)} Km/h, podendo ter rajadas ainda mais fortes`;
      if (this.wind > 90.0 && this.wind <= 100.0) return ` \n Alerta de tempestade ou ciclone extratropical! Hoje está com ventos de intensidade fortíssima, em torno de ${this.wind.toFixed(2)} Km/h, podendo ter rajadas ainda mais fortes`;
      if (this.wind > 100.0) return ` \n Alerta de ciclone tropical! Hoje está com ventos de intensidade fortíssima, em torno de ${this.wind.toFixed(2)} Km/h, podendo ter rajadas ainda mais fortes`;
    }
}
