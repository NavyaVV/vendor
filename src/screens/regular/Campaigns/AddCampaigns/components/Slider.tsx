import { Slider } from "@miblanchard/react-native-slider";
import { Box, Text, useTheme } from "@utils/Theme";
import React from "react";

interface sliderProps {
  value: Array<number>;
  setValue: (param: Array<number>) => void;
}

export default ({ value, setValue }: sliderProps) => {
  const { colors } = useTheme();

  return (
    <Box flex={1}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text variant="regular12" color="textColor07">
          0
        </Text>
        <Text variant="regular12" color="textColor07">
          25
        </Text>
      </Box>
      <Slider
        step={1}
        value={value}
        minimumValue={0}
        maximumValue={25}
        onValueChange={(res) => setValue(res)}
        minimumTrackTintColor={colors.primary}
        trackStyle={{ height: 5, backgroundColor: colors.boxColor16 }}
        thumbStyle={{
          width: 23,
          height: 23,
          borderWidth: 1,
          borderRadius: 20,
          borderColor: colors.boxColor06,
          backgroundColor: colors.secondary,
        }}
      />
    </Box>
  );
};
