import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { CoinListStoreContext } from "../state/CoinList";

// TODO: Add response decoders
// TODO: Load Coins from the server (pagination)
// TODO: Refresh list
// TODO: Show error
// TODO: Apply colorscheme
// TODO: Based on sign of change use different color: green on positive and red on Negative
// TODO: Click on coin: open coin profile
// TODO: On horizontal screen orientation show more fields
// TODO: Add tests with react-native-testing-library
// TODO: Show coins Icons
// TODO: Show capitalization as a progressbar
// TODO: Switch base currency (default: USD)

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

const CoinList = observer(() => {
  const coinListStore = useContext(CoinListStoreContext);

  useEffect(() => {
    coinListStore.getData();
  });

  return (
    <View>
      <Text style={styles.header}>Coins List</Text>
      <FlatList
        removeClippedSubviews={true}
        data={coinListStore.list}
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
});

const formatNumber = (num: number, digitCount: number) =>
  (Math.round(num * 10 ** digitCount) / 10 ** digitCount).toFixed(digitCount);

export default CoinList;
