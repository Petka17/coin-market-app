import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Coin } from "../common/types";
import { formatNumber } from "../common/utils";

interface Props {
  coin: Coin;
}

const CoinRow: React.FC<Props> = React.memo((props: Props) => {
  const { coin } = props;
  const changeColor = coin.priceChange < 0 ? "#d94040" : "#009e73";
  return (
    <View style={styles.row}>
      <Text style={styles.coinSymbol} numberOfLines={1}>
        {coin.symbol}
      </Text>
      <Text style={styles.coinName} numberOfLines={1}>
        {coin.name}
      </Text>
      <Text style={styles.price} numberOfLines={1}>
        ${formatNumber(coin.price, 4)}
      </Text>
      <Text
        style={[styles.priceChange, { color: changeColor }]}
        numberOfLines={1}
      >
        {formatNumber(coin.priceChange, 2)}%
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 1,
    height: 36,
    alignItems: "center",
    alignContent: "space-between",
    paddingVertical: 3,
    marginTop: 3,
    marginHorizontal: 3,
    backgroundColor: "#FFFFFF"
  },
  coinSymbol: {
    paddingHorizontal: 5,
    flexBasis: 60,
    fontSize: 13
  },
  coinName: {
    paddingHorizontal: 5,
    flex: 10,
    fontSize: 15
  },
  price: {
    paddingHorizontal: 5,
    flex: 6,
    textAlign: "right",
    color: "#1070e0"
  },
  priceChange: {
    paddingHorizontal: 5,
    flex: 4,
    textAlign: "right"
  }
});

export default CoinRow;
