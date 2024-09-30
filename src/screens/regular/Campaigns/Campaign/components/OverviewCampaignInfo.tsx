import CustomButton from "@components/CustomButton";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox, TrText } from "@utils/Theme";
import React from "react";
import OverviewCampaignRenderFunction from "./OverviewCampaignRenderFunction";
import { useAppSelector } from "@hooks/redux";
import {
  getCampaignDetails,
  getCampaignProducts,
} from "@store/selector/campaigns";
import moment from "moment";
import CampaignRenderChecklist from "../../AddCampaigns/components/CampaignRenderChecklist";

export default () => {
  const details = useAppSelector(getCampaignDetails);
  const campaignProducts = useAppSelector(getCampaignProducts);
  const getProductsList = () => {
    let productsList = "";
    if (Array.isArray(campaignProducts?.results)) {
      const selectedProduct = details?.products?.map(({ id }) => id);
      campaignProducts?.results.forEach((item: any) => {
        if (selectedProduct?.includes(item?.product.id))
          productsList = `${productsList}${
            productsList.length > 0 ? ", " : ""
          }${item?.product.product_name}`;
      });
    }
    return productsList;
  };

  const renderChecklist = () => {
    return details?.fields?.map((item: any) => {
      return (
        <CampaignRenderChecklist
          key={item?.field_name || item?.name || ""} // Add a unique key attribute
          label1="NAME"
          label2="FIELD NAME"
          data1={item?.field_name || item?.name || ""}
          data2={item?.is_Required || item?.isRequired}
          textColor1="textColor01"
          textColor2="textColor01"
        />
      );
    });
  };

  return !details ? null : (
    <Box flex={1} paddingVertical="xl" marginHorizontal="m">
      <TrText variant="semibold14" color="primary">
        CAMPAIGN INFO
      </TrText>
      <OverviewCampaignRenderFunction
        label1="CAMPAIGN NAME"
        data1={details.name}
        label2="PRODUCTS"
        data2={getProductsList()}
        textColor1="textColor01"
        textColor2="textColor01"
      />
      <OverviewCampaignRenderFunction
        label1="STATUS"
        data1={"N/A"}
        label2="RATING"
        data2={"N/A"}
        textColor1="textColor01"
        textColor2="textColor01"
      />
      <OverviewCampaignRenderFunction
        label1="CAMPAIGN START DATE"
        data1={moment(details.startDate).format("DD MMMM YYYY")}
        label2="CAMPAIGN END DATE"
        data2={moment(details.endDate).format("DD MMMM YYYY")}
        name1="calender"
        name2="calender"
        textColor1="textColor01"
        textColor2="textColorRed2"
      />
      <OverviewCampaignRenderFunction
        label1="SHOPS TARGETED"
        data1={"N/A"}
        label2="NO OF SE"
        data2={"N/A"}
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
          {details.additionalInfo}
        </Text>
      </Box>
      <Box marginTop="xxl">
        <Text variant="semibold15" color="primary">
          Location
        </Text>
        <OverviewCampaignRenderFunction
          label1="STATE"
          data1={details.state}
          label2="DISTRICT"
          data2={details.district}
          textColor1="textColor01"
          textColor2="textColor01"
        />
        <Box flex={1} marginTop="l">
          <Text variant="regular12" color="textColor06" marginBottom="ml">
            Area
          </Text>
          <Text variant="regular13" color="textColor01">
            {details.city}
          </Text>
        </Box>
      </Box>
      <Box marginTop="xxl">
        <Text variant="semibold15" color="primary" marginBottom="ml">
          CheckLists
        </Text>
        {renderChecklist()}
      </Box>

      {/* <Box marginVertical="x3l">
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
            height={38}
            borderRadius="m"
            backgroundColor="headerColor"
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
      </Box> */}
      {/* <CustomButton label="SHOW PRODUCTS LIST" variant="secondary" /> */}
    </Box>
  );
};
