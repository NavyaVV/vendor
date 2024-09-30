import { useEffect, useState } from "react";
import { Box, Text, TrText, useTheme } from "@utils/Theme";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import React, { useMemo } from "react";

const errorBoxHeight = 15;
interface dropdownProps {
  mandatory?: boolean;
  setCategory: (text: string | number) => void;
  value?: string | number | null;
  label: string;
  boxWidth?: number | string;
  dropdownData: Array<any>;
  dropPosition?: "auto" | "top" | "bottom";
  labelField?: string;
  valueField?: string;
  errorMessage?: Array<string> | string | number | null;
}

export default ({
  setCategory,
  mandatory,
  value,
  label,
  boxWidth,
  dropdownData,
  dropPosition,
  labelField,
  valueField,
  errorMessage,
}: dropdownProps) => {
  const [dropdownList, setDropdownList] = useState<any[]>([]);
  const { colors } = useTheme();
  const error = useMemo(() => {
    if (typeof errorMessage === "string") return errorMessage;
    if (errorMessage?.length) return errorMessage[0];
    return "";
  }, [errorMessage]);

  useEffect(() => {
    if (dropdownData?.length) {
      setDropdownList([...dropdownData] as any[] ?? [])
    }
  }, [dropdownData])

  return (
    <Box marginTop="m">
      <Box flexDirection="row">
        <TrText variant="regular12" marginBottom="s" color="textColor05">
          {label}
        </TrText>
        {mandatory === true && <Text color="textColor03"> *</Text>}
      </Box>
      <Box
        borderWidth={1}
        borderColor="boxColor19"
        width={boxWidth}
        height={52}
        padding="m"
        borderRadius="m"
        backgroundColor="boxColor22"
        paddingVertical="s"
      >
        <Dropdown
          maxHeight={300}
          dropdownPosition={dropPosition}
          showsVerticalScrollIndicator={false}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          labelField={labelField ?? ""}
          valueField={valueField ?? ""}
          data={dropdownList}
          style={styles.dropdown}
          value={value}
          onChange={(item) => setCategory(item[valueField ?? "id"], item)}
          iconColor={colors.primary}
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
