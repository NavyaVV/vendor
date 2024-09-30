import { menus } from "./menus.utls";
import { Box } from "@utils/Theme";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import menu from "./Menu";

export default () => (
  <Box
    marginTop="l"
    marginBottom="l"
    borderWidth={1}
    marginHorizontal="xxl"
    borderRadius="l"
    borderColor="borderColor01"
    // height={260}
    justifyContent="center"
    alignItems="center"
    paddingHorizontal="xxl"
    flexDirection="row"
  >
    <FlatList
      data={menus}
      numColumns={3}
      renderItem={menu}
      scrollEnabled={false}
      columnWrapperStyle={style.row}
      keyExtractor={(_, i) => i.toString()}
      showsHorizontalScrollIndicator={false}
    />
  </Box>
);

const style = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
