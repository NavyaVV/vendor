import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  productCategory,
  productListPagination,
} from "@store/reducers/product";
import { getLoading, getProductInfo } from "@store/selector/product";
import { productState } from "@typings/product";
import { Box, useTheme } from "@utils/Theme";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { GridCard, ListCard } from "./Cards";
import Header from "./Header";

interface refreshProps {
  refreshControl: JSX.Element;
}

export default ({ refreshControl }: refreshProps) => {
  const { spacing } = useTheme();
  const loader = useAppSelector(getLoading);
  const productInfo = useAppSelector(getProductInfo);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const dispatch = useAppDispatch();

  const columnWrapperStyle = {
    justifyContent: "space-between",
    paddingHorizontal: spacing.m,
  } as const;

  useEffect(() => {
    dispatch(productCategory());
  }, [dispatch]);

  const handleEndReach = useCallback(() => {
    // if (productInfo?.results && productInfo?.next)
    //   dispatch(productListPagination({ url: productInfo?.next }));
  }, [productInfo?.next, productInfo?.results, dispatch]);

  const renderFooter = () => {
    return loader === "pending" ? (
      <Box
        width="100%"
        height={100}
        alignItems="center"
        justifyContent="center"
      >
        <ActivityIndicator />
      </Box>
    ) : null;
  };

  const headerComponentFunc = () => (
    <Header
      selected={viewType}
      numberOfProducts={productInfo?.count}
      onChange={(change) => setViewType(change)}
    />
  );

  const renderGridItem = ({ item }: { item: productState }) => {
    const product_images = item?.product_images?.filter(
      ({ image_ref }) => image_ref
    );
    const newItem = { ...item, product_images: product_images };
    return <GridCard item={newItem} />;
  };

  const renderListItem = ({ item }: { item: productState }) => {
    const product_images = item?.product_images?.filter(
      ({ image_ref }) => image_ref
    );
    const newItem = { ...item, product_images: product_images };
    return <ListCard item={newItem} />;
  };

  return (
    <Box flex={1} alignItems="center">
      {viewType === "grid" && (
        <Box marginTop="m">
          <FlatList
            ListHeaderComponent={headerComponentFunc}
            numColumns={2}
            columnWrapperStyle={columnWrapperStyle}
            showsVerticalScrollIndicator={false}
            data={productInfo?.results}
            renderItem={renderGridItem}
            ListFooterComponent={renderFooter}
            onScrollEndDrag={handleEndReach}
            refreshControl={refreshControl}
          />
        </Box>
      )}
      {viewType === "list" && (
        <Box marginTop="m">
          <FlatList
            ListHeaderComponent={headerComponentFunc}
            showsVerticalScrollIndicator={false}
            data={productInfo?.results}
            renderItem={renderListItem}
            ListFooterComponent={renderFooter}
            onScrollEndDrag={handleEndReach}
            refreshControl={refreshControl}
          />
        </Box>
      )}
    </Box>
  );
};
