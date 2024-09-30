export interface PaymentState {
  loading: "idle" | "pending" | "succeeded" | "failstring";
  error: null | object | string;
  paymentDetails: paymentResponseItemState | null | undefined;
  couponDetails: Array<couponDetailsItemState>;
  paymentBreakupDetails: Array<paymentBreakupDetailsItemState>;
}

export interface paymentResponseItemState {
  card_details: Array<cardDetailsResponseState>;
  wallet_balance: number;
}

export interface cardDetailsResponseState {
  name_on_card: string;
  card_number: string;
  save_card: boolean;
}

export interface couponDetailsItemState {
  id: string;
  coupon_code: string;
  description: string;
  created_date: string;
  updated_date: string;
  deleted_date: string;
  is_deleted: boolean;
  is_active: boolean;
}

export interface paymentBreakupDetailsItemState {
  listing_price: number;
  vendor_fees: number;
  location_charge: number;
  taxable_value: number;
  igst: number;
  coupon: number;
}

export interface couponValidateParams {
  coupon_code: string;
}
