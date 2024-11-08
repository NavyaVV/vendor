import { productDeleteService } from "@config/services/product";
import { addProductErrorState, addProductParams } from "@typings/product";

export const addProductValidation = (
  addProductData: addProductParams
): {
  isValid: boolean;
  errorMsg: addProductErrorState;
} => {
  const returnVal = {
    isValid: false, // Assume form is valid initially
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

  // Check if the 'product' object exists and if fields are valid
  const { product } = addProductData;

  console.log("Validation - product data:", product);

  // Perform field validations
  if (!product?.product_name?.trim()) {
    returnVal.errorMsg.product_name = "Required*";
    returnVal.isValid = false;  // Indicate invalid form
  }

  if (!product?.max_retail_price) {
    returnVal.errorMsg.max_retail_price = "Required*";
    returnVal.isValid = false;
  }

  if (!product?.wholesale_price) {
    returnVal.errorMsg.wholesale_price = "Required*";
    returnVal.isValid = false;
  }

  if (!product?.product_category) {
    returnVal.errorMsg.product_category = "Required*";
    returnVal.isValid = false;
  }

  // If there are no error messages, set isValid to true (form is valid)
  if (
    !returnVal.errorMsg.product_name &&
    !returnVal.errorMsg.max_retail_price &&
    !returnVal.errorMsg.wholesale_price &&
    !returnVal.errorMsg.product_category
  ) {
    returnVal.isValid = true;
  }

  console.log("Validation result:", returnVal);
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
