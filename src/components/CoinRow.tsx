import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { formatNumber } from "../common/utils";
import { Coin } from "../common/types";

interface Props {
  coin: Coin;
  index: number;
  height: number;
}

const CoinRow: React.FC<Props> = React.memo((props: Props) => {
  const { coin, index, height } = props;

  const styles = createStyles(height);
  return (
    <View style={styles.row}>
      <Text style={styles.indexCell} numberOfLines={1}>
        {index + 1}
      </Text>
      <Text style={styles.coinSymbol} numberOfLines={1}>
        {coin.symbol}
      </Text>
      <Text style={styles.coinName} numberOfLines={1}>
        {coin.name}
      </Text>
      <Text style={styles.price} numberOfLines={1}>
        {formatNumber(coin.price, 4)}
      </Text>
      <Text style={styles.priceChange} numberOfLines={1}>
        {formatNumber(coin.priceChange, 2)}%
      </Text>
    </View>
  );
});

const createStyles = height =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      flex: 1,
      height: height - 6,
      alignItems: "center",
      alignContent: "space-between",
      paddingVertical: 3,
      marginVertical: 3,
      marginHorizontal: 6,
      backgroundColor: "grey"
    },
    indexCell: {
      paddingHorizontal: 5,
      flexBasis: 35,
      textAlign: "right",
      fontWeight: "bold"
    },
    coinSymbol: {
      paddingHorizontal: 5,
      flexBasis: 60,
      fontSize: 13
    },
    coinName: {
      paddingHorizontal: 5,
      flex: 12,
      fontSize: 15
    },
    price: {
      paddingHorizontal: 5,
      flex: 6,
      textAlign: "right"
    },
    priceChange: {
      paddingHorizontal: 5,
      flex: 4,
      textAlign: "right"
    }
  });

export default CoinRow;
