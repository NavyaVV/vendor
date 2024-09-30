import { useEffect, useState } from "react";
import { Box, Text, TrText, useTheme } from "@utils/Theme";
import { StyleSheet } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useMemo } from "react";

const errorBoxHeight = 15;
interface dropdownProps {
  mandatory?: boolean;
  setCategory: (item: Array<string>) => void;
  value?: Array<string>;
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
  const [showDrop, setShowDrop] = useState(false);
  const [dropdownList, setDropdownList] = useState<any[]>([]);
  const { colors } = useTheme();
  const error = useMemo(() => {
    if (typeof errorMessage === "string") return errorMessage;
    if (Array.isArray(errorMessage) && errorMessage.length)
      return errorMessage[0];
    return "";
  }, [errorMessage]);

  useEffect(() => {
    if (dropdownData?.length) {
      setDropdownList(([...dropdownData] as any[]) ?? []);
    }
  }, [dropdownData]);

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
        width={typeof boxWidth === "number" ? boxWidth : undefined}
        height={Array.isArray(value) && value.length ? "auto" : 52}
        padding="m"
        borderRadius="m"
        backgroundColor="boxColor22"
        paddingVertical="s"
      >
        <SectionedMultiSelect
          // showCancelButton
          // hideConfirm
          // autoFocus
          styles={{
            button: { backgroundColor: colors.primary },
            confirmText: { color: colors.boxColor19 },
            selectToggle: { height: "auto", marginTop: 5 },
            itemText: {
              fontSize: 13,
              fontFamily: "SFProDisplay-Regular",
              color: "#2E2E2E",
            },
            selectToggleText: {
              fontSize: 13,
              fontFamily: "SFProDisplay-Regular",
              lineHeight: 15,
              color: "#2E2E2E",
            },
            chipContainer: { borderColor: colors.boxColor19 },
          }}
          colors={{ selectToggleTextColor: colors.primary }}
          items={dropdownData}
          IconRenderer={Icon}
          displayKey="product_name"
          selectText={
            Array.isArray(value) && value.length
              ? "Selected Products"
              : "Select Products"
          }
          modalWithSafeAreaView
          uniqueKey="id"
          subKey="children"
          searchPlaceholderText="Search"
          showDropDowns={showDrop}
          onCancel={() => setShowDrop(false)}
          onSelectedItemsChange={(items: any[]) => setCategory(items)} // assuming you want the first item
          selectedItems={Array.isArray(value) ? value : []}
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
