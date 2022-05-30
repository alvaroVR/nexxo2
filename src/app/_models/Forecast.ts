export interface Forecast {
  detalles: [{
    idWeek: string,
    fcst: number
  }];
  label: string;
}

export interface StockPeriod {
  detalles: [{
    idWeek: string,
    saldo: number
  }];
  label: string;
}
