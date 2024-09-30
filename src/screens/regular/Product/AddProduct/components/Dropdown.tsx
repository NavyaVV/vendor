import { Box, TrText } from "@utils/Theme";
import { StyleSheet } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";

export default ({
  bg,
  setCategory,
  value,
  label,
  boxWidth,
  dropdownData,
  mTop,
  mBottom,
}: any) => {
  return (
    <Box marginTop={mTop} marginBottom={mBottom}>
      <TrText variant={"regular12"} marginBottom="m" color="textColor05">
        {label}
      </TrText>
      <Box
        borderWidth={1}
        borderColor="borderColor01"
        width={boxWidth}
        height={52}
        padding="m"
        borderRadius="m"
        backgroundColor={bg}
        paddingVertical={"s"}
      >
        <Dropdown
          showsVerticalScrollIndicator={false}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={dropdownData}
          maxHeight={300}
          labelField="category_name"
          valueField="category_name"
          value={value}
          onChange={(item) => {
            setCategory(item);
          }}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 13,
    marginHorizontal: 5,
    fontFamily: "SFProDisplay-Regular",
    lineHeight: 15,
  },
  selectedTextStyle: {
    fontSize: 13,
    fontFamily: "SFProDisplay-Regular",
    lineHeight: 15,
  },
});
