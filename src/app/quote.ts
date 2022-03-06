export interface Quote {
  Name: string;
  Symbol: string;
  LastPrice: number;
  Change: number;
  ChangePercent: number;
  MSDate: number;
  MarketCap: number | null;
  Volume: number;
  ChangeYTD: number;
  ChangePercentYTD: number;
  High: number;
  Low: number;
  Open: number;
  Timestamp?: Date;
}
