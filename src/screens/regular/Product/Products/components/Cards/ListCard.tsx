import ConfirmationPopup from "@components/ConfirmationPopup";
import PlaceholderIcon from "@components/PlaceholderIcon";
import ShowMorePopup from "@components/ShowMorePopup";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { deleteProduct } from "@helpers/product";
import { useAppDispatch } from "@hooks/redux";
import { productListing, updateProduct } from "@store/reducers/product";
import { productState } from "@typings/product";
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
      onPress={handleNavigateProduct}
      margin="m"
      flexDirection="row"
      height={114}
      backgroundColor="secondary"
      alignItems="center"
      borderRadius="l"
      borderColor="borderColor01"
      borderWidth={borderRadii.vs}
    >
      <Box borderRadius="x4l" marginLeft="xl" height={60} width={60}>
        <PlaceholderIcon icon="productsTabIcon" size={30} />
        <Image
          source={{
            uri: product_images.length
              ? `data:image/png;base64,${product_images[0].image_ref}`
              : undefined,
          }}
          borderRadius="x4l"
          marginLeft="xl"
          height={60}
          width={60}
        />
      </Box>
      <Box marginTop="s" marginStart="xxl">
        <Text variant="medium15" color="textColor02">
          {product.product_name}
        </Text>
        <Text variant="light13" marginTop="s" color="textColor02">
          {product.max_retail_price}
        </Text>
      </Box>
      <Box
        end={10}
        top={10}
        padding="s"
        position="absolute"
        alignItems="center"
        justifyContent="center"
      >
        <ShowMorePopup
          onSelectEdit={handleNavigateEdit}
          onSelectDelete={() => setShowDeletePopup(true)}
        />
      </Box>
      <ConfirmationPopup
        visible={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        type="Delete"
        onConfirm={handleConfirmDelete}
      />
    </TouchableBox>
  );
};
