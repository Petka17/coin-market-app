import { action, computed, observable } from "mobx";
import { createContext } from "react";

import { coinsRequest } from "../api/coinListing";
import { Coin, Currency } from "../common/types";

export class CoinListStore {
  @observable list: Coin[] = [];
  @observable error: string | null = null;
  @observable showError: boolean = false;
  @observable loading: boolean = false;

  @observable page: number = 0;
  perPage: number = 20;
  baseCurrency: Currency = "USD";

  @computed get list2() {
    return this.list;
  }

  @action getNextPage() {
    if (this.loading) return;
    this.page += 1;
    this.getData();
  }

  @action refresh() {
    if (this.loading) return;
    this.page = 0;
    this.list = [];
    this.getData();
  }

  @action getData() {
    if (this.loading) return;

    this.loading = true;

    coinsRequest(this.page, this.perPage, this.baseCurrency)
      .then(list => {
        this.list = this.list.concat(list);
        this.loading = false;
      })
      .catch(e => {
        this.loading = false;
        this.error = e.message;
        this.showError = true;
      });
  }

  @action closeError() {
    this.showError = false;
  }
}

export const CoinListStoreContext = createContext(new CoinListStore());
