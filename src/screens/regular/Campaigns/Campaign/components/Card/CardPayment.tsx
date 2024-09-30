import { Box, Image, Text, TouchableBox } from "@utils/Theme";
import React from "react";
import Info from "./Info";

interface CardPaymentProp {
  item: any;
}
export default ({ item }: CardPaymentProp) => {
  return (
    <TouchableBox
      width="100%"
      marginVertical="m"
      flexDirection="row"
      borderRadius="l"
      alignItems="center"
      paddingVertical="xxl"
      backgroundColor="boxColor22"
      borderColor="borderColor01"
      borderWidth={1}
    >
      <Image
        source={{ uri: item.uri }}
        borderRadius="x4l"
        marginLeft="xl"
        height={60}
        width={60}
      />
      <Box marginStart="xl">
        <Text variant="medium15" color="textColorGrey">
          {item.Payment}
        </Text>
        <Info label="Contact Person" content={item.Name} />
        <Info label="Sales Person" content={item.Salesperson} />
        <Info label="Date" content={item.Date} />
      </Box>
      <Box
        justifyContent="center"
        alignItems="center"
        position="absolute"
        end={15}
        top={15}
        flexDirection="row"
      >
        <Box
          height={8}
          width={8}
          backgroundColor="boxColor11"
          borderRadius="x4l"
          marginEnd="s"
        ></Box>
        <Text variant="regular10">{item.PaymentStatus}</Text>
      </Box>
    </TouchableBox>
  );
};
