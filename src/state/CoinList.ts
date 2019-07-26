import axios from "axios";
import { action, observable } from "mobx";
import { createContext } from "react";

const api = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com/v1/",
  headers: { "X-CMC_PRO_API_KEY": "ca6486f0-9083-4cc3-883c-0fb44371c17d" }
});

class CoinListStore {
  @observable list: RootObject[] = [];

  page: number = 0;
  perPage: number = 20;
  baseCurrency: Currency = "USD";

  @action getData() {
    api
      .get("cryptocurrency/listings/latest", {
        params: {
          start: 1 + this.page * this.perPage,
          limit: this.perPage,
          convert: "USD"
        }
      })
      .then(response => (this.list = response.data.data))
      .catch(console.error);
  }
}

export const CoinListStoreContext = createContext(new CoinListStore());

// === TEMP SECTION ===

type Currency = "USD" | "BTC";

export interface RootObject {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[];
  max_supply: number | null;
  circulating_supply: number;
  total_supply: number;
  platform?: any;
  cmc_rank: number;
  last_updated: string;
  quote: Quote;
}

export interface Quote {
  USD: USD;
}

export interface USD {
  price: number;
  volume_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  last_updated: string;
}
