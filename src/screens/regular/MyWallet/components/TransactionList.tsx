import { transactionListState } from "@typings/wallet";
import { IconBold } from "@utils/IconRegular";
import { Box, Text } from "@utils/Theme";
import moment from "moment";
import React from "react";

interface transactionListProps {
  item: transactionListState;
  index: number;
}

export default ({ item }: transactionListProps) => {
  return (
    <Box
      borderWidth={1}
      padding="l"
      height={63}
      backgroundColor="boxColor22"
      borderColor="borderColor01"
      borderRadius="m"
      marginVertical="_s"
      marginHorizontal="xxl"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Text variant="medium10" color="textColor01">
          {item.description}
        </Text>
        <Text variant="regular10" color="textColor10" marginTop="s">
          Date:
          {moment(item.created_date).format("DD MMMM YYYY HH. mm a")}
        </Text>
      </Box>
      <Box justifyContent="center" flexDirection="row">
        <Text
          marginRight="s"
          color={item.is_credit === true ? "boxColor02" : "textColor03"}
          variant={item.is_credit === true ? "semibold14" : "semibold14"}
        >
          {item.is_credit === true ? "+ ₹" : "- ₹"}
          {item.amount}
        </Text>
        <IconBold
          name={item.is_credit === true ? "downArrow" : "upArrow"}
          size={12}
          color={item.is_credit === true ? "boxColor02" : "textColor03"}
        />
      </Box>
    </Box>
  );
};
