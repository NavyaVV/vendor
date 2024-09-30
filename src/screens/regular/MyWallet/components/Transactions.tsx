/* eslint-disable prettier/prettier */
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { transactionListPagination } from "@store/reducers/wallet";
import { getTransactionInfo } from "@store/selector/wallet";
import { Box } from "@utils/Theme";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import HeaderComponent from "./HeaderComponent";
import transactionList from "./TransactionList";

export default () => {
  const transactionInfo = useAppSelector(getTransactionInfo);
  const [loadMore, setLoadMore] = useState(false);
  const dispatch = useAppDispatch();

  const handleEndReach = useCallback(() => {
    if (transactionInfo?.results && transactionInfo?.next) {
      setLoadMore(true);
      dispatch(transactionListPagination({ url: transactionInfo?.next }));
      setLoadMore(false);
    } else setLoadMore(false);
  }, [transactionInfo?.next, transactionInfo?.results, dispatch]);

  const loadingtransactions = () => {
    return loadMore ? <ActivityIndicator /> : null;
  };

  return (
    <Box flex={1}>
      <FlatList
        data={transactionInfo?.results}
        renderItem={transactionList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={HeaderComponent}
        ListFooterComponent={loadingtransactions}
        onScrollEndDrag={handleEndReach}
      />
    </Box>
  );
};
