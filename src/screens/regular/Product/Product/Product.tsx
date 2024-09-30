import Header from "@components/Header";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox, TrText, useTheme, Image } from "@utils/Theme";
import React from "react";
import { ScrollView } from "react-native";
import DataElement from "./components/DataElement";
import PlaceholderIcon from "@components/PlaceholderIcon";
import { useAppSelector } from "@hooks/redux";
import {
  getProductCategoryInfo,
  getProductDetails,
} from "@store/selector/product";

export default () => {
  const { colors } = useTheme();
  const productDetail = useAppSelector(getProductDetails);
  const categories = useAppSelector(getProductCategoryInfo);
  const category = categories?.find(
    (state) => state.id === productDetail?.product?.product_category
  )?.category_name;

  const { product_images = [] } = productDetail;
  console.log("product_images :", product_images);

  return (
    <Box flex={1} backgroundColor="secondary">
      <Header
        iconName="edit"
        headerText={productDetail?.product?.product_name}
        onPress={() => navigate(ROUTES.ADDPRODUCT)}
      />
      <ScrollView
        bounces={false}
        style={{ backgroundColor: colors.headerColor }}
      >
        <Box alignItems="center" padding="x3l">
          <Box height={176} width={"100%"}>
            {product_images?.length ? (
              <Image
                source={{
                  uri: product_images.length
                    ? `data:image/png;base64,${product_images[0].image_ref}`
                    : undefined,
                }}
                borderRadius="l"
                style={{ backgroundColor: "red" }}
                height={176}
                width={"100%"}
                resizeMode="center"
                resizeMethod="scale"
              />
            ) : (
              <PlaceholderIcon icon="productsTabIcon" size={80} />
            )}
          </Box>
        </Box>
        <Box flex={1} backgroundColor="secondary" paddingHorizontal="xxl">
          <Box flexDirection="row">
            {productDetail?.product?.id ? (
              <>
                <Box marginVertical="l" justifyContent="flex-start">
                  <DataElement
                    content={productDetail?.product?.product_name}
                    label="Product Name"
                  />
                  <DataElement
                    content={productDetail?.product?.quantity}
                    label="Product Quantity"
                  />
                  <DataElement
                    content={productDetail?.product?.max_retail_price}
                    label="Maximum Retail Price"
                  />
                  <DataElement
                    content={productDetail?.product?.offer_price}
                    label="Offer Price"
                  />
                </Box>
                <Box
                  marginVertical="l"
                  justifyContent="flex-start"
                  marginStart="x4l"
                >
                  <DataElement content={category} label="Category" />

                  <DataElement content="KG" label="Unit" />
                  <DataElement
                    content={productDetail?.product?.wholesale_price}
                    label="Whole Sale Price"
                  />
                </Box>
              </>
            ) : null}
          </Box>
          <TrText variant="regular12" color="textColor06">
            DESCRIPTION
          </TrText>
          <Box marginTop="l" marginBottom="x3l">
            <Text variant="regular13">
              {productDetail?.product?.id
                ? productDetail?.product?.description
                : undefined}
            </Text>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <TrText variant="regular12" color="textColor06">
              DOCUMENT
            </TrText>
            <Box
              flex={1}
              height={1}
              marginStart="l"
              backgroundColor="borderColor01"
            />
          </Box>
          <TouchableBox
            height={38}
            backgroundColor="headerColor"
            flexDirection="row"
            alignItems="center"
            marginTop="l"
            marginBottom="x4l"
            paddingHorizontal="xl"
            borderRadius="l"
          >
            <IconBold name="pdf" size={15} color="iconRose" />
            <Text variant="regular12" marginLeft="ml">
              {productDetail?.product?.id
                ? productDetail?.product?.document_ref
                : undefined}
            </Text>
          </TouchableBox>
        </Box>
      </ScrollView>
    </Box>
  );
};
