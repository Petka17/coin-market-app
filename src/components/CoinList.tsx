import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { CoinListStoreContext } from "../state/CoinList";
import CoinRow from "./CoinRow";
import ErrorPopup from "./ErrorPopup";

/**
 * The main component
 *
 * Based on a standard FlatList component.
 * It implements refresh and scroll loading features.
 * Came across with the problem when tried to pass mobx stor actions
 * directly to FlatList component props. In order to make it work
 * used inline arrow function, which is not good practice.
 * It's good candidate for future refactoring.
 */
const CoinList = observer(() => {
  const coinListStore = useContext(CoinListStoreContext);

  useEffect(() => {
    coinListStore.getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Coins</Text>
      <FlatList
        style={styles.list}
        data={coinListStore.list}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => <CoinRow coin={item} />}
        onRefresh={() => coinListStore.refresh()}
        refreshing={false}
        onEndReached={() => coinListStore.getNextPage()}
        onEndReachedThreshold={1}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        removeClippedSubviews={true}
      />
      <ErrorPopup
        show={coinListStore.showError}
        message={coinListStore.error}
        close={() => coinListStore.closeError()}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Helvetica Neue",
    color: "#17181b"
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 8,
    fontWeight: "bold",
    backgroundColor: "#F7FBFF"
  },
  list: {
    backgroundColor: "#EDF7FF"
  }
});

export default CoinList;
