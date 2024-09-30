import { State } from "@typings/State";
import { createSelector } from "reselect";

export const getWallet = (state: State) => state.wallet;

export const getWalletInfo = createSelector(
  getWallet,
  (wallet) => wallet.walletView
);

export const getTransactions = (state: State) => state.wallet;

export const getTransactionInfo = createSelector(
  getTransactions,
  (transactions) => transactions.transactionList
);
