import { normalize } from "@utils/dimensions";
import { Box, Image, Text } from "@utils/Theme";
import React from "react";
interface Prop {
  item: any;
  index: number;
}

export default ({ item, index }: Prop) => {
  return (
    <Box flexDirection="row" flex={1} paddingStart="xl">
      <Box borderWidth={2} borderColor="borderColor01" height="100%" />
      <Box
        borderWidth={3}
        borderRadius="x3l"
        borderColor={index % 2 === 0 ? "boxColor07" : "borderColor01"}
        height={normalize(23)}
        width={normalize(23)}
        backgroundColor={index % 2 === 0 ? "boxColor23" : "primary"}
        position="absolute"
        bottom="50%"
        start={9}
      />
      <Box
        flexDirection="row"
        backgroundColor="secondary"
        flex={1}
        borderWidth={1}
        borderColor="borderColor02"
        borderRadius="m"
        marginHorizontal="xl"
        marginBottom="xl"
      >
        <Box padding="l" justifyContent="center" alignItems="center">
          <Box alignItems="center" flex={1} justifyContent="center">
            <Text variant="regular10" color="primary">
              {item.date.month}
            </Text>
            <Text variant="bold21" color="primary">
              {item.date.day}
            </Text>
            <Text variant="bold13" color="primary">
              {item.date.year}
            </Text>
          </Box>
          <Text variant="regular10" color="textColor10" marginBottom="m">
            {item.time}
          </Text>
        </Box>
        <Box
          borderWidth={0.25}
          borderColor="borderColor01"
          height="100%"
          justifyContent="space-between"
        />
        <Box
          flex={1}
          marginTop="xxl"
          marginBottom="xl"
          paddingStart="l"
          paddingEnd="xl"
        >
          {index <= 9 ? (
            <Text variant="bold13" color="primary">
              0{index + 1}. {item.title}
            </Text>
          ) : (
            <Text variant="bold13" color="primary">
              {index + 1}. {item.title}
            </Text>
          )}
          <Text variant="regular10" marginTop="m" marginBottom="l">
            {item.desc}
          </Text>
          <Box flexDirection="row" alignItems="center">
            <Image
              source={{ uri: item.image }}
              height={normalize(20)}
              width={normalize(20)}
              borderRadius="x3l"
            />
            <Text variant="regular12" marginStart="s">
              {item.name}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        borderWidth={1}
        borderColor="borderColor01"
        height="100%"
        marginEnd="s"
      />
    </Box>
  );
};
