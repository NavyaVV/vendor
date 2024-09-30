import CustomFlatlist from "@components/CustomFlatlist";
import FilterPopup from "@components/FilterPopup";
import FloatingAdd from "@components/FloatingAdd";
import Header from "@components/Header";
import SearchFilter from "@components/SearchFilter";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  getPortfolioServiceProductList,
  portfolioCategory,
  portfolioListPagination,
  portfolioListing,
} from "@store/reducers/portfolio";
import { filterParamsState, portfolioListState } from "@typings/portfolio";
import { Box } from "@utils/Theme";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import { Card } from "./components";
import { getPortfolioInfo } from "@store/selector/portfolio";
import { useThunk } from "@hooks/use-thunk";
import { getUserReferenceId } from "@store/selector/auth";

export default () => {
  const clientId = useAppSelector(getUserReferenceId);
  const portfolio = useAppSelector(getPortfolioInfo);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<filterParamsState | null>(null);
  const [padinate, paginating] = useThunk(portfolioListPagination);
  const dispatch = useAppDispatch();

  const renderPortfolioList = () => {
    const param = { limit: 50, page: 1, search: search, vendorId: clientId };
    const filterData = { ...param, ...filter };
    dispatch(portfolioListing(filterData));
    setRefreshing(false);
  };

  useEffect(() => {
    renderPortfolioList();
    dispatch(portfolioCategory());
    dispatch(getPortfolioServiceProductList(clientId));
  }, [renderPortfolioList]);

  const handleFilter = (arg: filterParamsState | null) => {
    setFilter(arg);
    setShowFilter(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    renderPortfolioList();
  };

  const handleEndReach = useCallback(() => {
    if ((portfolio?.count ?? 0) > (portfolio?.results?.length ?? 0)) {
      const limit = portfolio?.limit;
      const page = (portfolio?.page ?? 0) + 1;
      padinate({ ...filter, limit, page });
    }
  }, [filter, portfolio]);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  );

  const renderHeader = () => (
    <SearchFilter
      placeholder="Search Portfolios"
      onFilter={() => setShowFilter(true)}
      value={search}
      onChangeText={setSearch}
      autoCapitalize="none"
      onSubmitEditing={renderPortfolioList}
    />
  );

  return (
    <Box flex={1} backgroundColor="secondary">
      <Header headerTrText="PORTFOLIO" iconName="menu" />
      <Box flex={1} paddingHorizontal="ml">
        <CustomFlatlist
          data={portfolio?.results ?? []}
          renderHeader={renderHeader}
          onScrollEndDrag={handleEndReach}
          refreshControl={refreshControl}
          paginationLoader={paginating}
          renderItem={({ item }) => <Card item={item as portfolioListState} />}
        />
        <FloatingAdd onPress={() => navigate(ROUTES.ADDPORTFOLIO)} />
      </Box>
      <FilterPopup
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onSubmit={(params) => handleFilter(params)}
      />
    </Box>
  );
};
