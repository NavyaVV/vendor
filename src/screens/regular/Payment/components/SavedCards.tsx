import { useAppSelector } from "@hooks/redux";
import { getCardDetails } from "@store/selector/payment";
import { Box, ImageBox, Text } from "@utils/Theme";
import React from "react";
import { FlatList } from "react-native";

export default () => {
  const cardInfo = useAppSelector(getCardDetails);
  const data = [
    {
      name: cardInfo?.card_details[0].name_on_card,
      cardNo: "1234  2156  ****  4123",
      image: require("@assets/images/card01.png"),
    },
    {
      name: cardInfo?.card_details[0].name_on_card,
      cardNo: "1234  2156  ****  4123",
      image: require("@assets/images/card02.png"),
    },
  ];

  const render = ({ item }) => {
    return (
      <ImageBox
        width={265}
        height={155}
        borderRadius="l"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
        marginRight={"xl"}
        source={item.image}
      >
        <Box start={95} bottom={20}>
          <Text color="textColor04" variant="light11">
            10/24
          </Text>
        </Box>
        <Box end={45}>
          <Text color="textColor04">{item.cardNo}</Text>
        </Box>

        <Box end={75} top={30}>
          <Text color="textColor04" variant="light11">
            Card Holder
          </Text>

          <Text color="textColor04" variant="regular13">
            {item.name}
          </Text>
        </Box>
      </ImageBox>
    );
  };
  return (
    <Box marginHorizontal="xxl">
      <Text variant="regular12" marginVertical="l">
        Saved Cards
      </Text>
      <FlatList
        data={data}
        renderItem={render}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
};
