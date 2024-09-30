export interface ProductState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error?: null | addProductErrorState;
  productsList: productListState | null | undefined;
  productCategory: Array<productCategoryState> | undefined;
  productDetails: productState | null | undefined;
}

export interface productImageState {
  id: string;
  images: string;
}
export interface productAddImageState {
  image: string;
}
export interface productState {
  product: {
    id: string;
    created_date: string;
    updated_date: string;
    is_active: boolean;
    product_name: string;
    quantity: number;
    unit: string;
    max_retail_price: string;
    wholesale_price: string;
    offer_price: string;
    document_ref: string;
    description: string;
    user: string;
    product_category: string | null;
  };
  product_images: Array<{
    id: string;
    created_date: string;
    updated_date: string;
    is_active: boolean;
    image_ref: string;
    product: string;
  }>;
}

export interface productListState {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Array<productState>;
}

export interface productCategoryState {
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  updated_date: string;
  category_name: string;
  created_date: string;
  deleted_date: string | null;
}

export interface addImageParams {
  is_active?: boolean;
  image_ref?: string;
  product?: string;
}

export interface addProductParams {
  product: {
    is_active?: boolean;
    type?: string;
    product_name?: string;
    quantity?: number;
    unit?: string;
    max_retail_price?: string;
    wholesale_price?: string;
    offer_price?: string;
    document_ref?: string;
    description?: string;
    user?: string;
    product_category?: string | null;
    vendor?: string | null;
  };
  product_images?: Array<addImageParams>;
}

export interface addProductErrorState {
  is_active?: Array<string> | string;
  type?: Array<string> | string;
  product_name?: Array<string> | string;
  quantity?: Array<string> | string;
  unit?: Array<string> | string;
  max_retail_price?: Array<string> | string;
  wholesale_price?: Array<string> | string;
  offer_price?: Array<string> | string;
  document_ref?: Array<string> | string;
  description?: Array<string> | string;
  user?: Array<string> | string;
  product_category?: Array<string> | string;
}

export interface productFilterState {
  category_name?: string;
  limit?: number;
  max_price?: number;
  min_price?: number;
  offset?: number;
  ordering?: string;
  search?: string;
}
