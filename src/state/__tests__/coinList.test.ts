import MockAdapter from "axios-mock-adapter";

import { api } from "../adapter";
import { CoinListStore } from "../CoinList";

let store: CoinListStore;

let mock: MockAdapter;

beforeEach(() => {
  mock = new MockAdapter(api);

  store = new CoinListStore();
});

test("should have empty coin list", async done => {
  const coin = {
    id: 1,
    symbol: "BTC",
    name: "Bitcoin",
    price: 9809.01998731,
    priceChange: -2.13604
  };

  mock.onGet(/cryptocurrency\/listings\/latest/).replyOnce(200, {
    status: {
      error_code: 200
    },
    data: [
      {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        quote: {
          USD: {
            price: coin.price,
            volume_24h: 14332800840.3911,
            percent_change_1h: -0.0892204,
            percent_change_24h: coin.priceChange,
            percent_change_7d: -5.99676,
            market_cap: 174986413193.3588,
            last_updated: "2019-07-26T17:32:35.000Z"
          }
        }
      }
    ]
  });

  store.getData();
  await wait();
});
