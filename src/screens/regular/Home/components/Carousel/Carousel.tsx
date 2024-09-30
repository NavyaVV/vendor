import { Box } from "@utils/Theme";
import React, { useRef } from "react";
import { FlatList } from "react-native";
import { list } from "./attributes";
import Card, { caroselCardProps } from "./Card";

interface cardProps {
  item: caroselCardProps;
  index: number;
}

export default () => {
  const listRef = useRef<FlatList>(null);

  const viewable = useRef(({ viewableItems }: any) => {
    console.log(viewableItems[0].index);
  }).current;

  const renderItem = ({ item }: cardProps) => (
    <Card {...item} />
  )

  return (
    <Box
      marginHorizontal="xxl"
      borderRadius="l"
      marginTop="xxl"
      overflow="hidden"
    >
      <FlatList
        horizontal
        pagingEnabled
        ref={listRef}
        data={list}
        bounces={false}
        renderItem={renderItem}
        onViewableItemsChanged={viewable}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
};
