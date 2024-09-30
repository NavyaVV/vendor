import Header from "@components/Header";
import { useAppDispatch } from "@hooks/redux";
import { useIsFocused } from "@react-navigation/native";
import { transactionListing, walletView } from "@store/reducers/wallet";
import { KeyboardAvoidingBox } from "@utils/Theme";
import React, { useEffect } from "react";
import Transactions from "./components/Transactions";

export default () => {
  const dispatch = useAppDispatch();
  const focussed = useIsFocused();

  useEffect(() => {
    if (focussed) {
      dispatch(walletView());
      dispatch(transactionListing({ limit: 5 }));
    }
  }, [dispatch, focussed]);

  return (
    <KeyboardAvoidingBox
      flex={1}
      behavior="padding"
      backgroundColor="secondary"
    >
      <Header headerTrText="MY WALLET" iconName="menu" />
      <Transactions />
    </KeyboardAvoidingBox>
  );
};
