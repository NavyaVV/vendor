import ShowMorePopup from "@components/ShowMorePopup";
import { IconBold } from "@utils/IconRegular";
import { Box, Image, Text, TouchableBox, useTheme } from "@utils/Theme";
import React, { useState } from "react";
import RaiseFeedback from "../RaiseFeedback";
import Info from "./Info";

export default ({ item }: any) => {
  const { iconSize, spacing } = useTheme();
  const [showMore, setShowMore] = useState(false);
  const [raiseFeedback, setRaiseFeedback] = useState(false);
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
        <Text variant="medium15">{item.Name}</Text>
        <Info label="Contact Person" content={item.ContactPerson} />
        <Info label="Sales Person" content={item.Salesperson} />
        <Box flexDirection="row" marginTop="m" alignItems="center" height={18}>
          <IconBold
            name="star"
            color="boxColor03"
            size={12}
            style={{ marginBottom: spacing._s }}
          />
          <Text variant="regular10" marginStart="s">
            {item.Rating}
          </Text>
        </Box>
      </Box>
      <TouchableBox
        onPress={() => setRaiseFeedback(true)}
        justifyContent="center"
        alignItems="center"
        position="absolute"
        end={40}
        top={50}
      >
        <Box
          backgroundColor={
            item.feedBack === "1" ? "boxColor07" : "borderColor01"
          }
          height={32}
          width={32}
          alignItems="center"
          justifyContent="center"
          borderRadius="x4l"
        >
          <IconBold
            name={item.feedBack === "1" ? "feedback" : "writeFeedback"}
            size={17}
            color={item.feedBack === "1" ? "boxColor23" : "primary"}
          />
        </Box>
      </TouchableBox>
      <Box
        end={10}
        top={10}
        padding="s"
        position="absolute"
        alignItems="center"
        justifyContent="center"
      >
        <ShowMorePopup cancel={true} />
      </Box>
      {raiseFeedback && (
        <RaiseFeedback
          visible={raiseFeedback}
          onClose={() => setRaiseFeedback(false)}
        />
      )}
    </TouchableBox>
  );
};
