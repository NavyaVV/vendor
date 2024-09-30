import { Box, Text, TrText } from "@utils/Theme";
import moment from "moment";
import React from "react";
import CampaignRenderFunction from "./campaignRenderFunction";
import CampaignRenderChecklist from "./CampaignRenderChecklist";
import { useAppSelector } from "@hooks/redux";
import { getCampaignProducts } from "@store/selector/campaigns";
interface optionProps {
  campaignPreview: any;
}

export default ({ campaignPreview }: optionProps) => {
  const campaignProducts = useAppSelector(getCampaignProducts);
  const renderChecklist = () => {
    return campaignPreview?.fields?.map((item: any) => {
      return (
        <CampaignRenderChecklist
          key={item.field_name} // Add a unique key attribute
          label1="NAME"
          label2="FIELD NAME"
          data1={item.field_name}
          data2={item.is_required}
          textColor1="textColor01"
          textColor2="textColor01"
          textColor06="textColor06"
        />
      );
    });
  };

  const getProductsList = () => {
    let productsList = "";
    if (Array.isArray(campaignProducts?.results)) {
      campaignProducts?.results.forEach((item: any) => {
        if (campaignPreview.products.includes(item?.product.id))
          productsList = `${productsList}${
            productsList.length > 0 ? ", " : ""
          }${item?.product.product_name}`;
      });
    }
    return productsList;
  };

  console.log("campaignPreview :", campaignPreview);
  return (
    <Box flex={1} paddingVertical="xl">
      <TrText variant="semibold14" color="primary">
        CAMPAIGN INFO
      </TrText>
      <CampaignRenderFunction
        label1="CAMPAIGN NAME"
        data1={campaignPreview?.name}
        label2="PRODUCTS"
        data2={getProductsList()}
        textColor1="textColor01"
        textColor2="textColor01"
        label={""}
      />
      <CampaignRenderFunction
        label1="CAMPAIGN START DATE"
        data1={moment(campaignPreview?.startDate).format("DD MMMM YYYY")}
        label2="CAMPAIGN END DATE"
        data2={moment(campaignPreview?.endDate).format("DD MMMM YYYY")}
        name1="calender"
        name2="calender"
        textColor1="textColor01"
        textColor2="textColor01"
      />
      <CampaignRenderFunction
        label1="SHOPS TARGETED"
        data1="234"
        label2="NO OF SE"
        data2="78"
        name1="shop"
        name2="salePersonGroup"
        textColor1="textColor01"
        textColor2="textColor01"
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
          {campaignPreview?.additionalInfo}
        </Text>
      </Box>
      <Box marginTop="xxl">
        <Text variant="semibold15" color="primary">
          Location
        </Text>
        <CampaignRenderFunction
          label1="STATE"
          label2="DISTRICT"
          data1={campaignPreview?.state}
          data2={campaignPreview?.district}
          textColor1="textColor01"
          textColor2="textColor01"
        />
        <Box flex={1} marginTop="l">
          <Text variant="regular12" color="textColor06" marginBottom="ml">
            Area
          </Text>
          <Text variant="regular13" color="textColor01">
            {campaignPreview?.campaignArea[0].area}
          </Text>
        </Box>
      </Box>
      <Box marginTop="xxl">
        <Text variant="semibold15" color="primary" marginBottom="ml">
          CheckLists
        </Text>
        {renderChecklist()}
      </Box>
    </Box>
  );
};
