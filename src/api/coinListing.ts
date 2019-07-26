import Decoder, * as _ from "jsonous";
import { makeRequest } from "./makeRequest";
import { Currency, Coin } from "../common/types";

/**
 * Get Coins List
 */
export const coinListUrl = (
  page: number,
  perPage: number,
  baseCurrency: Currency
): string =>
  `cryptocurrency/listings/latest?start=${1 +
    page * perPage}&limit=${perPage}&convert=${baseCurrency}`;

export const coinListDecoder = (baseCurrency: Currency): Decoder<Coin[]> =>
  _.array(
    _.succeed({})
      .assign("id", _.field("id", _.number))
      .assign("symbol", _.field("symbol", _.string))
      .assign("name", _.field("name", _.string))
      .assign("price", _.at(["quote", baseCurrency, "price"], _.number))
      .assign(
        "priceChange",
        _.at(["quote", baseCurrency, "percent_change_24h"], _.number)
      )
  );

export const codeRequest = (
  page: number,
  perPage: number,
  baseCurrency: Currency = "USD"
): Promise<Coin[]> =>
  makeRequest(
    coinListUrl(page, perPage, baseCurrency),
    "get",
    coinListDecoder(baseCurrency)
  );

/**
 * [
    {
      "id": 1,
      "name": "Bitcoin",
      "symbol": "BTC",
      "slug": "bitcoin",
      "num_market_pairs": 7730,
      "date_added": "2013-04-28T00:00:00.000Z",
      "tags": [
        "mineable"
      ],
      "max_supply": 21000000,
      "circulating_supply": 17839337,
      "total_supply": 17839337,
      "platform": null,
      "cmc_rank": 1,
      "last_updated": "2019-07-26T17:32:35.000Z",
      "quote": {
        "USD": {
          "price": 9809.01998731,
          "volume_24h": 14332800840.3911,
          "percent_change_1h": -0.0892204,
          "percent_change_24h": -2.13604,
          "percent_change_7d": -5.99676,
          "market_cap": 174986413193.3588,
          "last_updated": "2019-07-26T17:32:35.000Z"
        }
      }
    }
  ]
 */
