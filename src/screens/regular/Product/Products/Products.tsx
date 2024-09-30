import FloatingAdd from "@components/FloatingAdd";
import Header from "@components/Header";
import SearchFilter from "@components/SearchFilter";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { useAppDispatch } from "@hooks/redux";
import { useIsFocused } from "@react-navigation/native";
import { productListing, updateProduct } from "@store/reducers/product";
import { productFilterState } from "@typings/product";
import { Box } from "@utils/Theme";
import { BOTTOM_TAB } from "@utils/dimensions";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Filter from "./components/Filter";
import List from "./components/List";

type filterParamsType = productFilterState | null;

export default () => {
  const { bottom } = useSafeAreaInsets();
  const [showFilter, setShowFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState<filterParamsType>(null);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const handleAdd = () => {
    dispatch(updateProduct(null));
    navigate(ROUTES.ADDPRODUCT);
  };

  const handleFilter = (arg: filterParamsType) => {
    setFilters(arg);
    setShowFilter(false);
    dispatch(
      productListing({ arg: { ...arg, limit: 50, ordering: "-updated_date" } })
    );
  };

  const renderProductList = useCallback(() => {
    const param = { limit: 50, ordering: "-updated_date" };
    const filterData = { ...param, ...filters };
    dispatch(productListing({ arg: filterData }));
    setTimeout(() => setRefreshing(false), 1000);
  }, [dispatch, filters]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    renderProductList();
  }, [renderProductList]);

  const handleSearch = useCallback((search: string) => {
    setFilters(null);
    dispatch(
      productListing({ arg: { search, limit: 50, ordering: "-updated_date" } })
    );
  }, []);

  useEffect(renderProductList, [renderProductList, isFocused]);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  );

  return (
    <Box flex={1} backgroundColor="secondary">
      <Header iconName="menu" headerText="PRODUCTS" />
      <Box flex={1} style={{ marginBottom: BOTTOM_TAB + bottom }}>
        <SearchFilter
          autoCapitalize="none"
          onChangeText={handleSearch}
          placeholder="Search Products"
          onFilter={() => setShowFilter(true)}
          onSubmitEditing={renderProductList}
        />
        <List refreshControl={refreshControl} />
        <FloatingAdd onPress={handleAdd} />
      </Box>
      <Filter
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onSubmit={(params) => handleFilter(params)}
      />
    </Box>
  );
};
