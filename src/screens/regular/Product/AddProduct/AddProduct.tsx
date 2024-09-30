import Header from "@components/Header";
import { Box } from "@utils/Theme";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import Catalogue from "./components/Catalogue";
import Product from "./components/Product";
import SelectType from "@components/SelectType";
import { useAppSelector } from "@hooks/redux";
import { getProductDetails } from "@store/selector/product";

export default () => {
  const [product, setProduct] = useState(true);
  const productDetails = useAppSelector(getProductDetails);
  console.log("productDetails :", productDetails);
  return (
    <Box flex={1} backgroundColor="secondary">
      <Header
        headerTrText={`${
          productDetails?.product?.id ? "UPDATE" : "ADD"
        } PRODUCT`}
        iconName="menu"
      />
      <ScrollView>
        <Box padding="xxl">
          <SelectType
            label="TYPE"
            data={["PRODUCT"]}
            selectedIndex={product ? 0 : 1}
            onSelect={(i) => setProduct(i === "product")}
          />
          {product === true ? (
            <Product product={productDetails} />
          ) : (
            <Catalogue />
          )}
        </Box>
      </ScrollView>
    </Box>
  );
  // return (
  //   <Box flex={1} backgroundColor="secondary">
  //     <Header headerTrText="ADD PRODUCT/CATALOGUE" iconName="menu" />
  //     <ScrollView>
  //       <Box padding="xxl">
  //         <SelectType
  //           label="TYPE"
  //           data={["PRODUCT", "CATALOGUE"]}
  //           selectedIndex={product ? 0 : 1}
  //           onSelect={(i) => setProduct(i === 'product')}
  //         />
  //         {product === true ? (
  //           <Product product={productDetails} />
  //         ) : (
  //           <Catalogue />
  //         )}
  //       </Box>
  //     </ScrollView>
  //   </Box>
  // );
};
