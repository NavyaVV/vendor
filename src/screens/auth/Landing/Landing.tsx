import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { Box, TouchableBox, TrText } from "@utils/Theme";
import React, { useRef, useState } from "react";
import { Animated, FlatList } from "react-native";
import CarouselIndicator from "./components/CarouselIndicator";
import { renderFunction } from "./components/RenderFunction";
import { data } from "./attributes";

export default () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const viewable = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const scrollTo = () => {
    if (currentIndex < 2)
      listRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    else navigate(ROUTES.PHONELOGIN);
  };

  const handleLogin = () => navigate(ROUTES.PHONELOGIN);

  return (
    <Box flex={1} justifyContent="center" backgroundColor="secondary">
      <Box alignItems="flex-end" marginHorizontal="xx3l" marginTop="xxx3l">
        <TouchableBox onPress={handleLogin}>
          <TrText variant="medium18" color="textColor01">
            SKIP
          </TrText>
        </TouchableBox>
      </Box>
      <Box flex={4}>
        <FlatList
          ref={listRef}
          data={data}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          renderItem={renderFunction}
          onViewableItemsChanged={viewable}
        />
      </Box>
      <Box
        alignItems="flex-end"
        justifyContent="space-between"
        marginHorizontal="xx3l"
        flexDirection="row"
        marginBottom="xx4l"
      >
        <CarouselIndicator index={currentIndex} />
        <TouchableBox onPress={scrollTo}>
          <TrText variant="medium18" color="textColor01">
            NEXT
          </TrText>
        </TouchableBox>
      </Box>
    </Box>
  );
};
