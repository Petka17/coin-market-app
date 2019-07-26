import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { CoinListStoreContext } from "../state/CoinList";
import CoinRow from "./CoinRow";
import ErrorPopup from "./ErrorPopup";

// TODO: Apply nice colorscheme
// TODO: Based on sign of change use different color: green on positive and red on Negative
// TODO: Show coins Icons
// TODO: Show capitalization as a progressbar

// TODO: Strict Typescript

// TODO: Add tests with react-native-testing-library

// TODO: Switch base currency (default: USD)
// TODO: Refresh Button in the header
// TODO: Click on coin: open coin profile
// TODO: Run on iOS

// TODO: refactor make request: return Result

const CoinList = observer(() => {
  const coinListStore = useContext(CoinListStoreContext);

  useEffect(() => {
    coinListStore.getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Coins</Text>
      <FlatList
        data={coinListStore.list}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, index }) => (
          <CoinRow coin={item} index={index} height={ITEM_HEIGHT} />
        )}
        onRefresh={() => coinListStore.refresh()}
        refreshing={false}
        onEndReached={() => coinListStore.getNextPage()}
        onEndReachedThreshold={1}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index
        })}
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

const ITEM_HEIGHT = 40;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 10
  }
});

export default CoinList;
