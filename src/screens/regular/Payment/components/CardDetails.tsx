import { useAppSelector } from "@hooks/redux";
import { getCardDetails } from "@store/selector/payment";
import { WIDTH } from "@utils/dimensions";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TextInput } from "@utils/Theme";
import React from "react";

export default () => {
  const cardInfo = useAppSelector(getCardDetails);

  return (
    <Box marginVertical="xxl">
      <Box>
        <Text marginBottom="m" variant="regular12" color="textColor05">
          Card Number
        </Text>
        <Box
          height={52}
          borderColor="borderColor01"
          borderRadius="l"
          flexDirection={"row"}
          justifyContent="space-between"
          borderWidth={1}
          paddingHorizontal="l"
          alignItems="center"
        >
          <TextInput
            placeholder="Card Number"
            keyboardType="number-pad"
            value={cardInfo?.card_details[0].card_number}
            variant="regular12"
            color="textColor05"
          />
          <IconBold name="visa" size={20} color="primary" />
        </Box>
      </Box>
      <Box flexDirection="row" justifyContent="space-between" marginTop="xl">
        <Box>
          <Text marginBottom="m" variant="regular12" color="textColor05">
            Card Expiry
          </Text>
          <Box
            width={WIDTH / 2.5}
            height={52}
            borderColor="borderColor01"
            borderRadius="l"
            flexDirection={"row"}
            justifyContent="space-between"
            borderWidth={1}
            paddingHorizontal="l"
            alignItems="center"
          >
            <TextInput placeholder="MM/YYYY" keyboardType="number-pad" />
          </Box>
        </Box>
        <Box>
          <Box flexDirection="row" alignItems="center" marginBottom="m">
            <Text marginRight="s" variant="regular12" color="textColor05">
              CVV
            </Text>
            <IconBold name="info" size={12} />
          </Box>
          <Box
            height={52}
            width={WIDTH / 2.5}
            borderColor="borderColor01"
            borderRadius="l"
            flexDirection={"row"}
            justifyContent="space-between"
            borderWidth={1}
            paddingHorizontal="l"
            alignItems="center"
          >
            <TextInput
              placeholder="Ex: 033"
              maxLength={3}
              keyboardType="number-pad"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
