import CustomButton from "@components/CustomButton";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox, TrText } from "@utils/Theme";
import React, { useState } from "react";
import CompletedCampaignOverviewRenderFunction from "./CompletedCampaignOverviewRenderFunction";
import RaiseDispute from "./RaiseDispute";
export default () => {
  const [raiseDispute, setRaiseDispute] = useState(false);

  return (
    <Box flex={1} paddingVertical="l">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <TrText variant="semibold14" color="primary">
          CAMPAIGN INFO
        </TrText>
        <TouchableBox
          onPress={() => setRaiseDispute(true)}
          height={42}
          width={160}
          backgroundColor="boxColor22"
          borderColor="borderColor01"
          borderWidth={1}
          flexDirection="row"
          padding="m"
          alignItems="center"
          justifyContent="center"
          borderRadius="m"
        >
          <IconBold name="writeFeedback" size={15} color="primary" />
          <Text variant="regular13" color="primary" marginHorizontal="m">
            Raise a Dispute
          </Text>
        </TouchableBox>
      </Box>
      <CompletedCampaignOverviewRenderFunction
        label1="CAMPAIGN NAME"
        data1="Lorem Ipsum Campaign"
        label2="PORTFOLIO"
        data2="Lorem Ipsum Campaign"
        textColor1="textColor01"
        textColor2="textColor01"
      />
      <CompletedCampaignOverviewRenderFunction
        label1="STATUS"
        data1="Completed"
        label2="RATING"
        data2="4.0"
        textColor1="textColor01"
        textColor2="textColor01"
      />
      <CompletedCampaignOverviewRenderFunction
        label1="CAMPAIGN START DATE"
        data1="01 January 2023"
        label2="CAMPAIGN END DATE"
        data2="24 August 2023"
        name1="calender"
        name2="calender"
        textColor1="textColor01"
        textColor2="textColorRed2"
      />
      <CompletedCampaignOverviewRenderFunction
        label1="SHOPS TARGETED"
        data1="234"
        label2="NO OF SE"
        data2="78"
        name1="shop"
        name2="salePersonGroup"
        textColor1="primary"
        textColor2="primary"
      />
      <Box>
        <TrText
          marginTop="x2l"
          variant="regular12"
          marginBottom="ml"
          color="textColor06"
        >
          INFORMATION
        </TrText>
        <Text variant="regular13" color="textColor05">
          {
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
          }
        </Text>
      </Box>
      <Box marginTop="xxl">
        <Text variant="semibold15" color="primary">
          Location
        </Text>
        <CompletedCampaignOverviewRenderFunction
          label1="STATE"
          data1="Kerala"
          label2="DISTRICT"
          data2="Kottayam"
          textColor1="textColor01"
          textColor2="textColor01"
        />
        <Box flex={1} marginTop="l">
          <Text variant="regular12" color="textColor06" marginBottom="ml">
            Area
          </Text>
          <Text variant="regular13" color="textColor01">
            Ettumanoor,Kottayam,pala
          </Text>
        </Box>
      </Box>
      <Box marginTop="xxl">
        <Text variant="semibold15" color="primary" marginBottom="ml">
          CheckLists
        </Text>
        <Text variant="regular13" color="textColor01">
          Shop Name, Phone, Visiting Card, Email Address,{`\n`}Shop Image
        </Text>
      </Box>

      <Box marginVertical="x3l">
        <Box flexDirection="row" alignItems="center">
          <TrText variant="regular12" color="textColor01">
            COMPANY FILE
          </TrText>
          <Box
            height={1}
            width={220}
            marginStart="l"
            backgroundColor="borderColor01"
          />
        </Box>
        <Box marginTop="l" marginBottom="l">
          <TouchableBox
            backgroundColor="headerColor"
            height={38}
            flexDirection="row"
            alignItems="center"
          >
            <Box marginHorizontal="m">
              <IconBold name="pdf" color="primary" size={15} />
            </Box>
            <Text variant="regular12" color="primary">
              Ripple_tea.PDF
            </Text>
          </TouchableBox>
        </Box>
      </Box>
      <CustomButton label="SHOW PRODUCTS LIST" variant="secondary" />
      {raiseDispute && (
        <RaiseDispute
          visible={raiseDispute}
          onClose={() => setRaiseDispute(false)}
        />
      )}
    </Box>
  );
};
