import FilterPopup from "@components/FilterPopup";
import SearchFilter from "@components/SearchFilter";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useIsFocused } from "@react-navigation/native";
import {
  getVendorCampaignListing,
  campaignListPagination,
  getCampaignProduct,
} from "@store/reducers/campaigns";
import { getCampaignInfo, getLoading } from "@store/selector/campaigns";
import { campaignListState, filterParamsState } from "@typings/campaigns";
import { Box, useTheme } from "@utils/Theme";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import CampaignCard from "@components/CampaignCard";
import { portfolioListing } from "@store/reducers/portfolio";
import { getUserReferenceId } from "@store/selector/auth";

export default () => {
  const { spacing } = useTheme();
  const loader = useAppSelector(getLoading);
  const campaignInfo = useAppSelector(getCampaignInfo);
  const [showFilter, setShowFilter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filterParams, setFilterParams] = useState<filterParamsState | null>(
    null
  );
  const focussed = useIsFocused();
  const dispatch = useAppDispatch();
  const clientId = useAppSelector(getUserReferenceId);

  const renderCampaignsList = (search: string = "") => {
    let param = {
      limit: 100,
      offset: 1,
      orderBy: "createdAt",
      order: filterParams?.ascending ? "asc" : "desc",
    };
    if (filterParams?.status && filterParams?.status !== "all") {
      param.status = filterParams.status;
    }
    if (filterParams?.state && filterParams?.state !== "All") {
      param.state = filterParams.state;
    }
    if (search.length > 3) {
      param.search = search;
    }
    const filterData = { ...param };
    dispatch(getVendorCampaignListing({ id: clientId, params: filterData }));
    param = { ...param };
    // dispatch(portfolioListing(param));
    dispatch(getCampaignProduct());
    setRefreshing(false);
  };

  const handleSearch = (search: string) => {
    renderCampaignsList(search);
  };

  useEffect(() => {
    renderCampaignsList();
  }, [focussed, filterParams]);

  const handleRefresh = () => {
    setRefreshing(true);
    renderCampaignsList();
  };

  const handleEndReach = useCallback(() => {
    if (campaignInfo?.results && campaignInfo?.next)
      dispatch(campaignListPagination({ url: campaignInfo?.next, limit: 0 }));
  }, [campaignInfo?.next, campaignInfo?.results, dispatch]);

  const refreshControl = (
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
  );
  console.log("loader :", loader);
  const loadingCampaigns = () => {
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

  const renderCampaignCardItem = ({ item }: { item: campaignListState }) => (
    <CampaignCard item={item} pageReload={renderCampaignsList} />
  );

  return (
    <Box flex={1}>
      <SearchFilter
        autoCapitalize="none"
        placeholder="Search Campaigns"
        onChangeText={handleSearch}
        onFilter={() => setShowFilter(true)}
        onSubmitEditing={renderCampaignsList}
      />
      <FlatList
        style={{ paddingHorizontal: spacing.m }}
        data={campaignInfo?.results}
        ListFooterComponent={loadingCampaigns}
        renderItem={renderCampaignCardItem}
        onEndReached={handleEndReach}
        refreshControl={refreshControl}
      />
      <FilterPopup
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onSubmit={(params) => {
          setFilterParams({ ...params });
          setShowFilter(false);
        }}
      />
    </Box>
  );
};
