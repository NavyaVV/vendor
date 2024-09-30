import { productDeleteService } from "@config/services/product";
import { addProductErrorState, addProductParams } from "@typings/product";

export const addProductValidation = (
  addProductData: addProductParams
): {
  status: boolean;
  errorMsg: addProductErrorState;
} => {
  const returnVal = {
    status: false,
    errorMsg: {
      type: "",
      product_category: "",

      product_name: "",

      max_retail_price: "",
      wholesale_price: "",
      offer_price: "",
      document: "",
    },
  };
  if (!addProductData.product?.product_name?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.product_name = "Required*";
  }

  if (!addProductData.product?.max_retail_price) {
    returnVal.status = true;
    returnVal.errorMsg.max_retail_price = "Required*";
  }
  if (!addProductData.product?.wholesale_price) {
    returnVal.status = true;
    returnVal.errorMsg.wholesale_price = "Required*";
  }
  if (!addProductData.product?.product_category) {
    returnVal.status = true;
    returnVal.errorMsg.product_category = "Required*";
  }
  return returnVal;
};

export const deleteProduct = async (
  id: string
): Promise<{ status: "success" | "failure" }> => {
  try {
    const res = await productDeleteService(id);
    if (res?.data?.statusCode === 200) return { status: "success" };
    else return { status: "failure" };
  } catch (error) {
    return { status: "failure" };
  }
};
