import { Box, GradiantBox, useTheme } from "@utils/Theme";
import { HEIGHT, SEARCHBAR_HEIGHT } from "@utils/dimensions";
import React from "react";
import { ActivityIndicator, FlatList, FlatListProps } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import NoData from "./NoData";

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const AnimatedBox = Animated.createAnimatedComponent(Box);

const clamp = (value: number, lowerBound: number, upperBound: number) => {
  "worklet";
  return Math.min(Math.max(lowerBound, value), upperBound);
};

interface listProps extends Animated.AnimateProps<FlatListProps<unknown>> {
  loader?: boolean;
  renderHeader: () => JSX.Element;
  renderSubHeader?: () => JSX.Element;
  paginationLoader?: boolean;
  onRetry?: () => void;
}

export default ({
  loader,
  paginationLoader,
  renderSubHeader,
  renderHeader,
  ...props
}: listProps) => {
  const { spacing, colors } = useTheme();
  const transitionHeight = SEARCHBAR_HEIGHT + spacing.l * 2;
  const progress = useSharedValue(0);

  const listStyle = {
    height: HEIGHT,
    paddingTop: SEARCHBAR_HEIGHT + spacing.l * 2 + (renderSubHeader ? 50 : 0),
  };

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event, ctx: any) => {
      if (event.contentOffset.y > 0) {
        const diff = event.contentOffset.y - (ctx.prevY ?? 0);
        progress.value = clamp(progress.value + diff, 0, transitionHeight);
        ctx.prevY = event.contentOffset.y;
      } else progress.value = 0;
    },
  });

  const animateddBoxStyle = useAnimatedStyle(() => {
    const headerTranslation = interpolate(
      progress.value,
      [0, transitionHeight],
      [0, -transitionHeight],
      Extrapolate.CLAMP 
    );
    return {
      transform: [{ translateY: headerTranslation }],
    };
  });
  

  const renderFooter = () => (
    <>
      {paginationLoader && !loader && (
        <Box
          height={100}
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <ActivityIndicator size="small" color={colors.primary} />
        </Box>
      )}
      <Box height={100} />
    </>
  );

  return (
    <Box
      width="100%"
      height="100%"
      maxWidth={800}
      alignSelf="center"
      overflow="hidden"
    >
      {props.data?.length ? (
        <AnimatedFlatlist
          onScroll={handleScroll}
          style={listStyle}
          keyExtractor={(_, i) => i.toString()}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          {...props}
        />
      ) : (
        <NoData />
      )}
      {renderSubHeader && (
        <Box
          width="100%"
          position="absolute"
          top={SEARCHBAR_HEIGHT + spacing.l * 2}
        >
          {renderSubHeader()}
        </Box>
      )}
      <AnimatedBox position="absolute" width="100%" style={animateddBoxStyle}>
        <GradiantBox
          width="100%"
          paddingTop="m"
          colors={[colors.secondary, colors.glass]}
        >
          {renderHeader()}
        </GradiantBox>
      </AnimatedBox>
    </Box>
  );
};
