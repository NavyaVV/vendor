import { Box, TouchableBox, TrText, useTheme } from "@utils/Theme";
import React from "react";
import { ActivityIndicator } from "react-native";

interface optionProps {
  primaryButton: string;
  secondaryButton: string;
  onPressPrimary: () => void;
  onPressSecondary: () => void;
  loading?: boolean;
}

export default ({
  primaryButton,
  secondaryButton,
  onPressPrimary,
  onPressSecondary,
  loading,
}: optionProps) => {
  const { colors } = useTheme();

  return (
    <Box
      width="100%"
      flexDirection="row"
      justifyContent="space-between"
      marginVertical="x3l"
    >
      <TouchableBox
        onPress={onPressSecondary}
        height={45}
        flex={1}
        paddingHorizontal="l"
        justifyContent="center"
        borderRadius="l"
        backgroundColor="boxColor17"
        alignItems="center"
      >
        <TrText variant="regular12" color="textColor15">
          {secondaryButton}
        </TrText>
      </TouchableBox>
      <TouchableBox
        onPress={onPressPrimary}
        backgroundColor="primary"
        height={45}
        flex={1}
        marginLeft="l"
        padding="m"
        justifyContent="center"
        borderRadius="l"
        alignItems="center"
      >
        {loading ? (
          <ActivityIndicator color={colors.secondary} />
        ) : (
          <TrText variant="regular12" color="textColor09">
            {primaryButton}
          </TrText>
        )}
      </TouchableBox>
    </Box>
  );
};
