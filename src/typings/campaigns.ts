import { portfolioListState } from "./portfolio";

export interface CampaignState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null | object | string;
  campaignsList: campaignResponseItemState | null | undefined;
  campaignProducts: campaignProductsState | null | undefined;
  campaignPreview: campaignResponseItemState | null | undefined;
  campaignsDetails: campaignDetailState | null | undefined;
  addedCampaignData: campaignDetailState | null | undefined;
  newCampData: campaignDetailState | null | undefined;
  campaignChecklistLookup: campaignDetailState | null | undefined;
}

export interface campaignListState {
  additionalInfo: string;
  city: string;
  createdAt: string;
  district: string;
  duration: number;
  endDate: string;
  estimatedPrice: string;
  id: number;
  isActive: boolean;
  listingPrice: number;
  name: string;
  startDate: string;
  state: string;
  txnId: string | null;
  txnStatus: string | null;
  updatedAt: string;
  vendorFee: string;
  xp: number;
  salesCount: number;
  jobs: Array<any>;
}

export interface campaignResponseItemState {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<campaignListState>;
}

export type addCampaignErrorTypes = {
  [key in keyof addCampaignParams]?: string;
};

export interface addCampaignParams {
  name?: string;
  portfolio?: number | string;
  startDate?: string;
  endDate?: string;
  duration?: number;
  additionalInfo?: string;
  state?: string;
  district?: string;
  city?: string;
  estimatedPrice?: number;
  vendor?: number;
  xp?: number;
  listingPrice?: number;
  vendorFee?: number;
  productCategory?: String;
  campaignArea?: Array<locationState>;
  products?: Array<productsState>;
  fields?: Array<checkListState>;
}

export interface productsState {
  id: string | number;
}
export interface checkListState {
  field_name: string;
  is_required: boolean;
  field_type: string;
}

export interface locationState {
  area: string;
  coordinates: string;
}

export interface locationState {
  area: string;
  coordinates: string;
}

export interface portfolioListDropState {
  value: string | number;
  data: string;
}

export interface portfolioServiceState {
  category: string;
  createdAt: string;
  documentRef: string;
  id: string | number;
  image: string;
  isActive: boolean;
  name: string;
  maxRetailPrice: string;
  offerPrice: string;
  productId: string | number;
  productName: string;
  qty: number;
  shortDesc: string;
  unit: string;
  updatedAt: string;
  vendorId: string | number;
  wholeSalePrice: number;
}

export interface portfolioProductState {
  category: string;
  createdAt: string;
  documentRef: string;
  id: string | number;
  image: string;
  isActive: boolean;
  name: string;
  maxRetailPrice: string;
  offerPrice: string;
  productId: string | number;
  productName: string;
  qty: number;
  shortDesc: string;
  unit: string;
  updatedAt: string;
  vendorId: string | number;
  wholeSalePrice: number;
}

export interface createCampaignParams {
  portfolio?: any;
  expiry?: any;
  startDate?: string;
  endDate?: string;
  user?: string;
  duration?: number;
  name?: string;
  additionalInfo?: string;
  campaignType?: string;
  productCategory?: object | any;
  products?: Array<string>;
}

export interface addCampaignLocationPramstate {
  state?: string;
  district?: string;
  city?: string;
  estimatedPrice?: string;
  salesCount?: number;
  campaignArea?: Array<locationState>;
}

export interface campaignDetailState {
  portfolio: portfolioListState;
  checklists: Array<string>;
  additionalInfo: string;
  city: string;
  createdAt: string;
  district: string;
  duration: number;
  endDate: string;
  estimatedPrice: string;
  id: number;
  isActive: true;
  listingPrice: number;
  name: string;
  startDate: string;
  state: string;
  txnId: string | null;
  txnStatus: string | null;
  updatedAt: string;
  vendorFee: string;
  vendor: string;
  status: string;
  xp: number;
  productCategory: any;
  products: Array<string>;
  salesCount: number;
  jobs: Array<any>;
}

export interface filterParamsState {
  ascending?: boolean;
  descending?: boolean;
  price?: string | null;
  date?: any;
  status?: string | null;
  state?: string | null;
  search?: string | null;
  startPrice?: string | null;
  endPrice?: string | null;
}

export interface campaignProductsState {
  category_list?: Array<portfolioServiceState>;
  count?: number;
  results?: Array<portfolioProductState>;
}
