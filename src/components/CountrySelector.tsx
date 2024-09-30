import { country_data } from "@utils/DataConstants";
import { Box, TrText } from "@utils/Theme";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";
import ErrorMessage from "./ErrorMessage";

interface countrySelectorProps {
  errorMessage?: Array<string> | string | null;
  onChangeFn?: Function;
}

export default ({ errorMessage, onChangeFn }: countrySelectorProps) => {
  const [country, setCountry] = useState("1");

  return (
    <>
      <Box marginTop="m">
        <TrText variant="regular12" marginBottom="m" color="textColor05">
          COUNTRY
        </TrText>
        <Box
          borderWidth={1}
          borderColor="borderColor01"
          height={52}
          padding="m"
          borderRadius="m"
          backgroundColor="secondary"
          paddingVertical={"s"}
        >
          <SelectCountry
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            imageStyle={styles.imageStyle}
            iconStyle={styles.iconStyle}
            maxHeight={200}
            value={country}
            data={country_data}
            valueField="value"
            labelField="lable"
            imageField="image"
            placeholder="Select country"
            onChange={(e) => {
              onChangeFn(e.lable);
              setCountry(e.value);
            }}
          />
        </Box>
        <ErrorMessage errorMessage={errorMessage} />
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: { height: 40 },
  imageStyle: { width: 24, height: 24 },
  placeholderStyle: { fontSize: 13 },
  selectedTextStyle: { fontSize: 13, marginLeft: 8 },
  iconStyle: { width: 20, height: 20 },
});
