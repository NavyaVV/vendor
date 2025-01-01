import {
  addProductService,
  productCategoryService,
  productDetailsService,
  productEditService,
  productPaginationService,
  productService,
} from "@config/services/product";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { State } from "@typings/State";
import {
  productListState,
  ProductState,
  productCategoryState,
  addProductErrorState,
  productState,
} from "@typings/product";

const initialState: ProductState = {
  loading: "idle",
  error: null,
  productsList: null,
  productCategory: [],
  productDetails: null,
};

type Response = {
  addedProductData?: productState;
  productData?: productListState | null;
  productCategory?: Array<productCategoryState>;
  productDetails?: productState | null;
  error?: object | null;
};

type Arguments = {
  id?: string;
  arg: object;
  callback?: () => void;
};

type Reducer = {
  state: State;
  rejectValue: null | addProductErrorState;
};

export const productListing = createAsyncThunk<Response, Arguments, Reducer>(
  "product/productsListing",
  async ({ arg }, { rejectWithValue }) => {
    try {
      const res = await productService(arg);
      console.log(res.data.result.results, 'product listing');
//       console.log("Product Listing with Images:");
// res.data.result.results.forEach((item, index) => {
//   console.log(`Product ${index + 1}:`, item.product_images);
// });

      if (res?.data?.statusCode === 200) {
        return {
          productData: res.data.result, 
          categoryList: res.data.result.category_list, 
          error: null,
        };

      } else {
        return rejectWithValue(res.data.error);
      }
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);


export const productListPagination = createAsyncThunk<
  Response,
  { url: string },
  Reducer
>("product/productListPagination", async ({ url }, { rejectWithValue }) => {
  try {
    const res = await productPaginationService(url);
    if (res?.data?.statusCode === 200)
      return {
        productData: res.data.result,
        error: null,
      };
    else return rejectWithValue(res.data.error);
  } catch (e) {
    return rejectWithValue(null);
  }
});

export const addProduct = createAsyncThunk<Response, Arguments, Reducer>(
  "product/addProduct",
  async ({ arg, callback }, { rejectWithValue, dispatch }) => {
    try {
      // console.log("Arguments for adding product:", arg);

      // Additional check for vendor ID
      if (!arg.vendor) {
        console.error("Vendor ID is missing");
        return rejectWithValue({ error: "Vendor ID is missing" });
      }

      const res = await addProductService(arg);
      console.log("Response from addProductService:", res);

      if (res?.data?.statusCode === 201) {
        const param = { limit: 50, ordering: "-updated_date" };
        dispatch(productListing({ arg: param }));
        if (callback) callback();
        return {        
          addedProductData: res.data.result,
          error: null,
        };
      } else {
        console.error("Add Product Error:", res.data.error);
        return rejectWithValue(res.data.error);
      }

    } catch (e) {
      console.error("Error in addProduct:", e);
      return rejectWithValue(null);
    }
  }
);


export const editProduct = createAsyncThunk<Response, Arguments, Reducer>(
  "product/editProduct",
  async ({ id, arg, callback }, { rejectWithValue, dispatch }) => {
    try {
      if (id) {
        const res = await productEditService(id, arg);
        if (res?.data?.statusCode === 200) {
          // Log the edited product details
          console.log("Edited Product Details:", res.data.result.result);
          
          const param = { limit: 50, ordering: "-updated_date" };
          console.log(arg,"argss", param, 'Argmntssss');
          
          dispatch(productListing({ arg: param }));
          if (callback) callback();
          return {
            productDetails: res.data.result.result,
            error: null,
          };
        } else {
          return rejectWithValue(res.data.error);
        }
      } else {
        return rejectWithValue(null);
      }
    } catch (e) {
      console.error("Edit Product Error:", e); // Log any errors that occur
      return rejectWithValue(null);
    }
  }
);


export const productCategory = createAsyncThunk<Response, undefined, Reducer>(
  "product/productCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await productCategoryService();
      if (res?.data?.statusCode === 200)
        return {
          productCategory: res.data.result,
          error: null,
        };
      else return rejectWithValue(res.data.error);
    } catch (e) {
      return rejectWithValue(null);
    }
  }
);
export const productDetails = createAsyncThunk<
  Response,
  string | number,
  Reducer
>("product/productDetails", async (id, { rejectWithValue }) => {
  try {
    const res = await productDetailsService(id);
    if (res?.data?.statusCode === 200 && res.data.result?.length)
      return {
        productDetails: res.data.result,
        error: null,
      };
    else return rejectWithValue(res.data.error);
  } catch (e) {
    return rejectWithValue(null);
  }
});

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateProduct: (state, action: PayloadAction<productState | null>) => {
      state.productDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Product Listing
    builder.addCase(productListing.fulfilled, (state, action) => {
      state.productsList = action.payload.productData;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(productListing.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(productListing.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });

    //product pagination list
    builder.addCase(productListPagination.fulfilled, (state, action) => {
      state.error = null;
      state.loading = "idle";
      state.productsList = {
        ...action.payload.productData,
        results: [
          ...(state.productsList?.results ?? []),
          ...(action.payload.productData?.results ?? []),
        ],
      };
    });
    builder.addCase(productListPagination.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(productListPagination.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });

    // Add Product
    builder.addCase(addProduct.fulfilled, (state) => {
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(addProduct.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });

    // Product Category listing
    builder.addCase(productCategory.fulfilled, (state, action) => {
      state.productCategory = action.payload.productCategory;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(productCategory.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(productCategory.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });

    // Product Details
    builder.addCase(productDetails.fulfilled, (state, action) => {
      state.productDetails = action.payload.productDetails;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(productDetails.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(productDetails.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });

    // Product Edit
    builder.addCase(editProduct.fulfilled, (state, action) => {
      const product = action.payload.productDetails;
      const productList = state.productsList?.results;
      const productIndex = productList?.findIndex(
        (state) => state.product.id === product?.product.id
      );
      if (productList?.length && productIndex && product?.product.id)
        productList[productIndex] = product;
      state.productsList = { ...state.productsList, results: productList };
      state.productDetails = action.payload.productDetails;
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(editProduct.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
  },
});

export const { setError, updateProduct } = productSlice.actions;
export default productSlice.reducer;
