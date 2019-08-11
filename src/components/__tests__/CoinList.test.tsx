import MockAdapter from "axios-mock-adapter";
import React from "react";
import { render } from "react-native-testing-library";

import { api } from "../../api/adapter";
import CoinList from "../CoinList";

let mock: MockAdapter;

beforeEach(() => {
  mock = new MockAdapter(api);
});

test("should ", () => {
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
            percent_change_24h: coin.priceChange
          }
        }
      }
    ]
  });

  const utils = render(<CoinList />);
});
