import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

// import { CoinListStoreContext } from "../state/CoinList";

// TODO: Load Coins from the server (pagination)
// TODO: Refresh list
// TODO: Apply colorscheme
// TODO: Based on sign of change use different color: green on positive and red on Negative
// TODO: Click on coin: open coin profile
// TODO: On horizontal screen orientation show more fields
// TODO: Add tests with react-native-testing-library
// TODO: Show coins Icons

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 10
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    alignContent: "space-between",
    paddingVertical: 3,
    marginVertical: 3,
    marginHorizontal: 6,
    backgroundColor: "grey"
  },
  indexCell: {
    paddingHorizontal: 5,
    flexBasis: 30,
    textAlign: "right",
    fontWeight: "bold"
  },
  coinName: {
    paddingHorizontal: 5,
    flex: 10,
    fontSize: 17
  },
  coinSymbol: {
    paddingHorizontal: 5,
    flex: 3,
    fontSize: 13
  },
  price: {
    paddingHorizontal: 5,
    flex: 7,
    textAlign: "right"
  },
  priceChange: {
    paddingHorizontal: 5,
    flex: 3,
    textAlign: "right"
  }
});

const CoinList = () => {
  // const coinListStore = useContext(CoinListStoreContext);
  return (
    <View>
      <Text style={styles.header}>Coins List</Text>
      <FlatList
        removeClippedSubviews={true}
        data={data}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.indexCell}>{index + 1}</Text>
            <Text style={styles.coinSymbol}>{item.symbol}</Text>
            <Text style={styles.coinName}>{item.name}</Text>
            <Text style={styles.price}>
              {formatNumber(item.quote.USD.price, 4)}
            </Text>
            <Text style={styles.priceChange}>
              {formatNumber(item.quote.USD.percent_change_24h, 2)}%
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const formatNumber = (price: number, n: number) =>
  (Math.round(price * 10 ** n) / 10 ** n).toFixed(n);

export default CoinList;

// === TEMP SECTION ===
const data = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    slug: "bitcoin",
    num_market_pairs: 7720,
    date_added: "2013-04-28T00:00:00.000Z",
    tags: ["mineable"],
    max_supply: 21000000,
    circulating_supply: 17836812,
    total_supply: 17836812,
    platform: null,
    cmc_rank: 1,
    last_updated: "2019-07-25T11:33:28.000Z",
    quote: {
      USD: {
        price: 10087.0134697,
        volume_24h: 17239440591.3745,
        percent_change_1h: 0.0139557,
        percent_change_24h: -3.64211,
        percent_change_7d: 1.73113,
        market_cap: 179920162900.5066,
        last_updated: "2019-07-25T11:33:28.000Z"
      }
    }
  },
  {
    id: 1027,
    name: "Ethereum",
    symbol: "ETH",
    slug: "ethereum",
    num_market_pairs: 5498,
    date_added: "2015-08-07T00:00:00.000Z",
    tags: ["mineable"],
    max_supply: null,
    circulating_supply: 107043907.249,
    total_supply: 107043907.249,
    platform: null,
    cmc_rank: 2,
    last_updated: "2019-07-25T11:33:20.000Z",
    quote: {
      USD: {
        price: 222.75692542,
        volume_24h: 7333892297.53452,
        percent_change_1h: 0.15607,
        percent_change_24h: 7.34096,
        percent_change_7d: 2.46893,
        market_cap: 23844771663.73089,
        last_updated: "2019-07-25T11:33:20.000Z"
      }
    }
  },
  {
    id: 52,
    name: "XRP",
    symbol: "XRP",
    slug: "ripple",
    num_market_pairs: 438,
    date_added: "2013-08-04T00:00:00.000Z",
    tags: [],
    max_supply: 100000000000,
    circulating_supply: 42832704971,
    total_supply: 99991553791,
    platform: null,
    cmc_rank: 3,
    last_updated: "2019-07-25T11:33:03.000Z",
    quote: {
      USD: {
        price: 0.31894872723,
        volume_24h: 1272029908.35324,
        percent_change_1h: 0.136373,
        percent_change_24h: 3.29286,
        percent_change_7d: 0.971663,
        market_cap: 13661436734.318544,
        last_updated: "2019-07-25T11:33:03.000Z"
      }
    }
  },
  {
    id: 2,
    name: "Litecoin",
    symbol: "LTC",
    slug: "litecoin",
    num_market_pairs: 572,
    date_added: "2013-04-28T00:00:00.000Z",
    tags: ["mineable"],
    max_supply: 84000000,
    circulating_supply: 62814893.3333857,
    total_supply: 62814893.3333857,
    platform: null,
    cmc_rank: 4,
    last_updated: "2019-07-25T11:33:05.000Z",
    quote: {
      USD: {
        price: 94.8831644074,
        volume_24h: 3188537258.61794,
        percent_change_1h: 0.542568,
        percent_change_24h: 5.3782,
        percent_change_7d: 1.14229,
        market_cap: 5960075851.38493,
        last_updated: "2019-07-25T11:33:05.000Z"
      }
    }
  },
  {
    id: 1831,
    name: "Bitcoin Cash",
    symbol: "BCH",
    slug: "bitcoin-cash",
    num_market_pairs: 363,
    date_added: "2017-07-23T00:00:00.000Z",
    tags: ["mineable"],
    max_supply: 21000000,
    circulating_supply: 17910625,
    total_supply: 17910625,
    platform: null,
    cmc_rank: 5,
    last_updated: "2019-07-25T11:33:05.000Z",
    quote: {
      USD: {
        price: 305.77735568,
        volume_24h: 1396404427.9159,
        percent_change_1h: 0.105097,
        percent_change_24h: 5.07371,
        percent_change_7d: 1.84662,
        market_cap: 5476663551.0761,
        last_updated: "2019-07-25T11:33:05.000Z"
      }
    }
  },
  {
    id: 1839,
    name: "Binance Coin",
    symbol: "BNB",
    slug: "binance-coin",
    num_market_pairs: 214,
    date_added: "2017-07-25T00:00:00.000Z",
    tags: [],
    max_supply: 187536713,
    circulating_supply: 155536713,
    total_supply: 187536713,
    platform: null,
    cmc_rank: 6,
    last_updated: "2019-07-25T11:33:04.000Z",
    quote: {
      USD: {
        price: 29.3743716886,
        volume_24h: 259015411.575559,
        percent_change_1h: -0.252837,
        percent_change_24h: 2.62691,
        percent_change_7d: 4.33198,
        market_cap: 4568793218.885103,
        last_updated: "2019-07-25T11:33:04.000Z"
      }
    }
  },
  {
    id: 1765,
    name: "EOS",
    symbol: "EOS",
    slug: "eos",
    num_market_pairs: 328,
    date_added: "2017-07-01T00:00:00.000Z",
    tags: [],
    max_supply: null,
    circulating_supply: 924669602.9679,
    total_supply: 1021369608.6589,
    platform: null,
    cmc_rank: 7,
    last_updated: "2019-07-25T11:33:04.000Z",
    quote: {
      USD: {
        price: 4.6017951503,
        volume_24h: 2745549935.93645,
        percent_change_1h: 0.719448,
        percent_change_24h: 9.97198,
        percent_change_7d: 16.3254,
        market_cap: 4255140094.567509,
        last_updated: "2019-07-25T11:33:04.000Z"
      }
    }
  },
  {
    id: 825,
    name: "Tether",
    symbol: "USDT",
    slug: "tether",
    num_market_pairs: 2709,
    date_added: "2015-02-25T00:00:00.000Z",
    tags: [],
    max_supply: null,
    circulating_supply: 4023792514.76656,
    total_supply: 4270057493.36343,
    platform: {
      id: 83,
      name: "Omni",
      symbol: "OMNI",
      slug: "omni",
      token_address: "31"
    },
    cmc_rank: 8,
    last_updated: "2019-07-25T11:33:13.000Z",
    quote: {
      USD: {
        price: 1.00353910509,
        volume_24h: 19381719585.2379,
        percent_change_1h: -0.073219,
        percent_change_24h: 0.42112,
        percent_change_7d: -0.00439978,
        market_cap: 4038033139.336674,
        last_updated: "2019-07-25T11:33:13.000Z"
      }
    }
  },
  {
    id: 3602,
    name: "Bitcoin SV",
    symbol: "BSV",
    slug: "bitcoin-sv",
    num_market_pairs: 137,
    date_added: "2018-11-09T00:00:00.000Z",
    tags: ["mineable"],
    max_supply: 21000000,
    circulating_supply: 17854985.7508877,
    total_supply: 17854985.7508877,
    platform: null,
    cmc_rank: 9,
    last_updated: "2019-07-25T11:33:11.000Z",
    quote: {
      USD: {
        price: 166.591378912,
        volume_24h: 430312067.536972,
        percent_change_1h: -0.345391,
        percent_change_24h: 1.8767,
        percent_change_7d: 27.9666,
        market_cap: 2974486696.694494,
        last_updated: "2019-07-25T11:33:11.000Z"
      }
    }
  },
  {
    id: 512,
    name: "Stellar",
    symbol: "XLM",
    slug: "stellar",
    num_market_pairs: 272,
    date_added: "2014-08-05T00:00:00.000Z",
    tags: [],
    max_supply: null,
    circulating_supply: 19616917913.1581,
    total_supply: 105182816018.614,
    platform: null,
    cmc_rank: 10,
    last_updated: "2019-07-25T11:33:03.000Z",
    quote: {
      USD: {
        price: 0.0863974107098,
        volume_24h: 143864407.929336,
        percent_change_1h: 0.119337,
        percent_change_24h: 3.84352,
        percent_change_7d: 1.23765,
        market_cap: 1694850913.803553,
        last_updated: "2019-07-25T11:33:03.000Z"
      }
    }
  }
];
