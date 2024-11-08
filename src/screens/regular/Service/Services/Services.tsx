import CustomFlatlist from "@components/CustomFlatlist";
import FloatingAdd from "@components/FloatingAdd";
import Header from "@components/Header";
import SearchFilter from "@components/SearchFilter";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  serviceListing,
  servicesListPagination,
} from "@store/reducers/service";
import { getLoading, getServiceInfo } from "@store/selector/service";
import { filterParamsState, serviceListState } from "@typings/service";
import { Box } from "@utils/Theme";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import Card from "./components/Card";
import Filter from "./components/Filter";

export default () => {
  const loader = useAppSelector(getLoading);
  const serviceInfo = useAppSelector(getServiceInfo);
  const [showFilter, setShowFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilter] = useState<filterParamsState | null>(null);
  const dispatch = useAppDispatch();

  const renderServiceList = useCallback(() => {
    const param = { limit: 50, ordering: "-updated_date" };
    const callback = () => setRefreshing(false);
    const filterData = { ...param, ...filters };
    dispatch(serviceListing({ arg: filterData, callback }));
  }, [dispatch, filters]);

  useEffect(renderServiceList, [renderServiceList]);

  const handleFilter = (arg: filterParamsState | null) => {
    setFilter(arg);
    setShowFilter(false);
    if (arg) dispatch(serviceListing({ arg: { ...arg, limit: 50 } }));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    renderServiceList();
  };

  const handleEndReach = useCallback(() => {
    if (serviceInfo?.results && serviceInfo?.next)
      dispatch(servicesListPagination({ url: serviceInfo.next }));
  }, [serviceInfo?.next, serviceInfo?.results, dispatch]);

  const handleSearch = (search: string) => {
    dispatch(serviceListing({ arg: { search, limit: 50 } }));
    setFilter(null);
  };

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  );

  const renderHeader = () => (
    <SearchFilter
      autoCapitalize="none"
      placeholder="Search Services"
      onFilter={() => setShowFilter(true)}
      onChangeText={handleSearch}
    />
  );

  const renderItem = ({ item, index }: { item: unknown; index: number }) => (
    <Card item={item as serviceListState} index={index} />
  );

  return (
    <Box flex={1} backgroundColor="secondary">
      <Header headerTrText="SERVICES" iconName="menu" />
      <Box flex={1} paddingHorizontal="ml">
        <CustomFlatlist
          renderItem={renderItem}
          data={serviceInfo}
          renderHeader={renderHeader}
          onEndReached={handleEndReach}
          refreshControl={refreshControl}
          paginationLoader={loader === "pending"}
        />
        <FloatingAdd onPress={() => navigate(ROUTES.ADDSERVICES)} />
      </Box>
      <Filter
        visible={showFilter}
        onSubmit={handleFilter}
        onClose={() => setShowFilter(false)}
      />
    </Box>
  );
};
