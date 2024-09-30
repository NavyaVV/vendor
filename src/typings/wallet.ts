export interface WalletState {
  loading: "idle" | "pending" | "succeeded" | "failstring";
  error: null | object | string;
  walletView: walletResponseItemState | null | undefined;
  transactionList: transactionResponseItemState | null | undefined;
}

export interface walletResponseItemState {
  is_active: boolean;
  available_balance: number;
}

export interface transactionListState {
  created_date: string;
  is_credit: boolean;
  is_active: boolean;
  amount: number;
  description: string;
}

export interface transactionResponseItemState {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<transactionListState>;
}
