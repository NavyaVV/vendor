import { productDeleteService } from "@config/services/product";
import { addProductErrorState, addProductParams } from "@typings/product";

export const addProductValidation = (
  addProductData: addProductParams
): {
  isValid: boolean;
  errorMsg: addProductErrorState;
} => {
  const returnVal = {
    isValid: true, // Assume form is valid initially
    errorMsg: {
      type: "",
      product_category: "",
      product_name: "",
      max_retail_price: "",
      wholesale_price: "",
      offer_price: "",
      document_ref: "",
      description: "",
      user: "",
      vendor: "",
      quantity: "",
      unit: "",
    },
  };

  // Extract product from addProductData
  const { product } = addProductData;

  console.log("Validation - product data:", product);

  // Validate fields inside product
  if (!product?.product_name?.trim()) {
    returnVal.errorMsg.product_name = "Required*";
    returnVal.isValid = false;
  }

  if (!product?.max_retail_price || isNaN(Number(product.max_retail_price))) {
    returnVal.errorMsg.max_retail_price = "Required* and should be a valid number";
    returnVal.isValid = false;
  }

  if (!product?.wholesale_price || isNaN(Number(product.wholesale_price))) {
    returnVal.errorMsg.wholesale_price = "Required* and should be a valid number";
    returnVal.isValid = false;
  }

  if (!product?.offer_price || isNaN(Number(product.offer_price))) {
    returnVal.errorMsg.offer_price = "Required* and should be a valid number";
    returnVal.isValid = false;
  }

  if (!product?.product_category || product?.product_category === 'null' || product?.product_category === '') {
    returnVal.errorMsg.product_category = "Required*";
    returnVal.isValid = false;
  }

  // Check if category is valid
  const validCategories = [
    { category_name: "TEST ABC", id: "7b745e66-fab7-4544-8002-124e07c4cba6" },
    { category_name: "KOll", id: "481ea136-7639-460f-8aaa-c7eec0e160dd" },
  ];

  const isValidCategory = validCategories.some(
    (category) => category.id === product?.product_category
  );

  if (!isValidCategory) {
    returnVal.errorMsg.product_category = "Invalid category selected*";
    returnVal.isValid = false;
  }

  if (product?.quantity && (isNaN(Number(product.quantity)) || product.quantity <= 0)) {
    returnVal.errorMsg.quantity = "Must be a valid and positive number";
    returnVal.isValid = false;
  }

  if (product?.unit && product.unit.trim() === "") {
    returnVal.errorMsg.unit = "Required*";
    returnVal.isValid = false;
  }

  if (product?.description && product.description.trim() === "") {
    returnVal.errorMsg.description = "Required*";
    returnVal.isValid = false;
  }

  if (product?.is_active === undefined || typeof product?.is_active !== 'boolean') {
    returnVal.errorMsg.is_active = "Required* and should be a boolean";
    returnVal.isValid = false;
  }

  // Final check for error messages
  if (
    returnVal.errorMsg.product_name ||
    returnVal.errorMsg.max_retail_price ||
    returnVal.errorMsg.wholesale_price ||
    returnVal.errorMsg.offer_price ||
    returnVal.errorMsg.product_category ||
    returnVal.errorMsg.quantity ||
    returnVal.errorMsg.unit ||
    returnVal.errorMsg.description ||
    returnVal.errorMsg.is_active
  ) {
    returnVal.isValid = false;
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
