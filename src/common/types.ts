export type Currency = "USD" | "BTC";

export interface Coin {
  id: number;
  symbol: string;
  name: string;
  price: number;
  priceChange: number;
}

export interface FailedResponse {
  code: number;
  message: string;
}
