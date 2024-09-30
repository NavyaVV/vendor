import { portfolioDeleteService } from "@config/services/portfolio";
import {
  addPortfolioParams,
  portfolioErrorState,
  portfolioListState,
} from "@typings/portfolio";

interface formErrorProps {
  status: boolean;
  errorMsg: portfolioErrorState;
}

export const addPortfolioValidation = (
  params: addPortfolioParams
): {
  status: boolean;
  errorMsg: portfolioErrorState;
} => {
  const returnVal: formErrorProps = {
    status: false,
    errorMsg: {
      portfolioName: "",
      category: "",
      productIds: "",
      serviceIds: "",
    },
  };
  if (!params.portfolioName?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.portfolioName = "Product name is Required";
  }
  if (typeof params.category !== "number") {
    returnVal.status = true;
    returnVal.errorMsg.category = "Category is Required";
  }
  if (params.type === 1 && !params.serviceIds?.length) {
    returnVal.status = true;
    returnVal.errorMsg.serviceIds = "Services are required";
  }
  if (params.type !== 1 && !params.productIds?.length) {
    returnVal.status = true;
    returnVal.errorMsg.productIds = "Products are required";
  }

  return returnVal;
};

export const deletePortfolio = async (
  id: string
): Promise<{ status: "success" | "failure" }> => {
  try {
    const res = await portfolioDeleteService(id);
    if (res?.data?.statusCode === 200) return { status: "success" };
    else return { status: "failure" };
  } catch (error) {
    return { status: "failure" };
  }
};

export const portfolioTypes = {
  "0": "Products",
  "1": "Services",
};

export const mapPortfolioDetails = (portfolio: portfolioListState) => {
  return {
    ...portfolio,
    category: portfolio.category?.id,
    productIds: portfolio.products.map((product) => product.id),
    serviceIds: portfolio.services.map((service) => service.id),
    type: portfolioTypes[portfolio.type ?? "0"] as "Service" | "Product",
  };
};
