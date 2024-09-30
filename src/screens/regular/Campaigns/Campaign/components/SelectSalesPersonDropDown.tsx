import React, { useState, useEffect } from "react";
import { Box, TrText } from "@utils/Theme";
import { StyleSheet } from "react-native";
import { SelectCountry } from "react-native-element-dropdown";

const local_data = [
  {
    value: "1",
    lable: "Christopher Watson",
    image: {
      uri: "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=",
    },
  },
];

export interface Props {}

export default ({ details }) => {
  const [person, setPerson] = useState<any>([]);
  const [selectSalesperson, setSelectSalesperson] = useState("1");
  // local_data = []

  useEffect(() => {
    if (details?.campaignSaleperson && details?.campaignSaleperson.length > 0) {
      let salesPersons: any[] = [];
      details?.campaignSaleperson.forEach(({ saleperson }) => {
        salesPersons.push({
          value: saleperson.id,
          lable: `${saleperson.fName} ${saleperson.lName}`,
          image: {
            uri: "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc=",
          },
        });
      });
      setSelectSalesperson(salesPersons[0].value);
      setPerson(salesPersons);
    }
  }, [details]);

  return (
    <Box marginBottom={"l"}>
      <TrText variant="regular12" marginBottom="m" color="textColor05">
        SALESPERSON
      </TrText>
      <Box
        borderWidth={1}
        borderColor="borderColor01"
        height={52}
        padding="m"
        borderRadius="m"
        backgroundColor="boxColor22"
        paddingVertical={"s"}
      >
        <SelectCountry
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          maxHeight={200}
          value={selectSalesperson}
          data={person}
          valueField="value"
          labelField="lable"
          imageField="image"
          placeholder="Select Sales Person"
          onChange={(e) => {
            // setSelectSalesperson(e.value);
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
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 18,
  },
  placeholderStyle: {
    fontSize: 13,
  },
  selectedTextStyle: {
    fontSize: 13,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: "#D93573",
  },
});
