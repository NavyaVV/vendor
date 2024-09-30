export interface PortfolioState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: portfolioErrorState | null | undefined;
  portfolioList: portfolioResponseItemState | null | undefined;
  portfolioCategory?: Array<categoryState> | null;
  products?: Array<portfolioProductState> | null;
  services?: Array<portfolioServiceState> | null;
  portfolioDetails: portfolioDetailsState | null | undefined;
}

export interface portfolioListState {
  id: number;
  type: "0" | "1" | null;
  isActive: boolean;
  category: categoryState | null;
  createdAt: string;
  description: string;
  portfolioName: string;
  updatedAt: string;
  products: Array<{ productName: string; id: number }>;
  services: Array<{ serviceName: string; id: number }>;
}

export interface categoryState {
  id: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface portfolioResponseItemState {
  results?: Array<portfolioListState>;
  count?: number;
  limit?: number;
  page?: number;
}

export interface portfolioProductState {
  id: number;
  productName: string;
}
export interface portfolioServiceState {
  id: number;
  label: string;
}

export interface addPortfolioParams {
  portfolioName?: string;
  category?: number;
  productIds?: Array<number>;
  serviceIds?: Array<number>;
  description?: string;
  vendorId?: string | number;
  type?: string | number;
}

export interface portfolioDetailsState {
  id: string;
  name: string;
  type: string;
  category: string;
  short_description: string;
  created_date: string;
  updated_date: string;
  deleted_date: string;
  is_deleted: boolean;
  is_active: boolean;
  product: [];
  service: [
    {
      name: string;
      id: string;
    },
    {
      name: string;
      id: string;
    }
  ];
}

export type portfolioErrorState = {
  [key in keyof addPortfolioParams]?: Array<string> | string;
};

export interface filterParamsState {
  ascending?: boolean;
  descending?: boolean;
  price?: string;
  date_created?: string;
  status?: string;
  state?: string;
}
