import { Box, Text, TrText, useTheme } from "@utils/Theme";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const errorBoxHeight = 15;
interface dropdownProps {
  mandatory?: boolean;
  setCategory: (item: any) => void;
  label: string;
  boxWidth?: number | string;
  dropdownData?: Array<any>;
  dropPosition?: "auto" | "top" | "bottom";
  labelField: string;
  valueField: string;
  errorMessage?: Array<string> | string | null;
}

export default ({
  setCategory,
  mandatory,
  label,
  boxWidth,
  dropdownData,
  dropPosition,
  labelField,
  valueField,
  errorMessage,
}: dropdownProps) => {
  const { colors } = useTheme();
  const error = useMemo(() => {
    if (typeof errorMessage === "string") return errorMessage;
    if (errorMessage?.length) return errorMessage[0];
    return "";
  }, [errorMessage]);

  return (
    <Box marginBottom="_s">
      <Box flexDirection="row">
        <TrText variant="regular12" marginBottom="s" color="textColor05">
          {label}
        </TrText>
        {mandatory === true && <Text color="textColor03"> *</Text>}
      </Box>
      <Box
        height={52}
        padding="m"
        borderRadius="m"
        borderWidth={1}
        width={boxWidth}
        borderColor="boxColor19"
        backgroundColor="boxColor22"
        paddingVertical="s"
      >
        <Dropdown
          value={""}
          maxHeight={300}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          showsVerticalScrollIndicator={false}
          dropdownPosition={dropPosition}
          iconColor={colors.primary}
          data={dropdownData}
          labelField={labelField}
          valueField={valueField}
          onChange={setCategory}
        />
      </Box>
      <Box height={errorBoxHeight} marginTop="_s">
        <Text variant="regular12" color="textColorRed2" paddingHorizontal="m">
          {error}
        </Text>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  dropdown: { height: 40 },
  placeholderStyle: {
    fontSize: 13,
    marginHorizontal: 5,
    fontFamily: "SFProDisplay-Regular",
    lineHeight: 15,
    color: "#2E2E2E",
  },
  selectedTextStyle: {
    fontSize: 13,
    fontFamily: "SFProDisplay-Regular",
    lineHeight: 15,
    color: "#2E2E2E",
  },
});
