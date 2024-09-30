import ConfirmationPopup from "@components/ConfirmationPopup";
import PlaceholderIcon from "@components/PlaceholderIcon";
import ShowMorePopup from "@components/ShowMorePopup";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { deleteProduct } from "@helpers/product";
import { useAppDispatch } from "@hooks/redux";
import { productListing, updateProduct } from "@store/reducers/product";
import { productState } from "@typings/product";
import { WIDTH } from "@utils/dimensions";
import { Box, Image, Text, TouchableBox, useTheme } from "@utils/Theme";
import React, { useCallback, useState } from "react";

interface itemProp {
  item: productState;
}

export default ({ item }: itemProp) => {
  const { product, product_images } = item;
  const { borderRadii } = useTheme();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const dispatch = useAppDispatch();

  const handleConfirmDelete = useCallback(async () => {
    const onDelete = await deleteProduct(product.id);
    if (onDelete.status === "success") {
      const param = { limit: 10, ordering: "-updated_date" };
      dispatch(productListing({ arg: param }));
    }
    setShowDeletePopup(false);
  }, [product.id]);

  const handleNavigateProduct = () => {
    dispatch(updateProduct(item));
    navigate(ROUTES.PRODUCT);
  };

  const handleNavigateEdit = () => {
    dispatch(updateProduct(item));
    navigate(ROUTES.ADDPRODUCT);
  };

  return (
    <TouchableBox
      height={203}
      marginTop="m"
      borderRadius="l"
      marginVertical="m"
      alignItems="center"
      width={WIDTH * 0.47}
      backgroundColor="secondary"
      borderColor="borderColor01"
      borderWidth={borderRadii.vs}
      onPress={handleNavigateProduct}
    >
      <Box
        top={10}
        width={15}
        height={35}
        padding="s"
        marginTop="m"
        marginRight="l"
        alignSelf="flex-end"
        alignItems="center"
        backgroundColor="secondary"
        borderWidth={0.2}
        borderColor="borderColor01"
        borderRadius="x5l"
      >
        <Box position="absolute" top={7}>
          <ShowMorePopup
            onSelectEdit={handleNavigateEdit}
            onSelectDelete={() => setShowDeletePopup(true)}
          />
        </Box>
      </Box>
      <Box height={85} width={85}>
        <PlaceholderIcon icon="productsTabIcon" size={40} />
        <Image
          source={{
            uri: product_images.length
              ? `data:image/png;base64,${product_images[0].image_ref}`
              : undefined,
          }}
          borderRadius="l"
          height={85}
          width={85}
        />
      </Box>
      <Box marginTop="l" alignItems="center">
        <Text variant="medium15" color="textColor02">
          {product.product_name}
        </Text>
        <Text variant="light13" marginTop="s" color="textColor02">
          {product.max_retail_price}
        </Text>
      </Box>
      <ConfirmationPopup
        type="Delete"
        visible={showDeletePopup}
        onConfirm={handleConfirmDelete}
        onClose={() => setShowDeletePopup(false)}
      />
    </TouchableBox>
  );
};
