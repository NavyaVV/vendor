import {
  addCampaignLocationPramstate,
  addCampaignParams,
} from "@typings/campaigns";
import { campaignDeleteService } from "@config/services/campaigns";

export const addCampaignsValidation = (
  addCampaignData: addCampaignParams
): {
  status: boolean;
  errorMsg: addCampaignParams;
} => {
  const returnVal = {
    status: false,
    errorMsg: {
      name: "",
      startDate: "",
      endDate: "",
      portfolio: "",
      productCategory: "",
      products: "",
    },
  };
  if (!addCampaignData.name?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.name = "Required*";
  }
  if (!addCampaignData.productCategory) {
    returnVal.status = true;
    returnVal.errorMsg.productCategory = "Required*";
  }
  if (!addCampaignData.products && !addCampaignData.products?.length) {
    returnVal.status = true;
    returnVal.errorMsg.products = "Required*";
  }
  if (!addCampaignData.startDate) {
    returnVal.status = true;
    returnVal.errorMsg.startDate = "Required*";
  }

  if (!addCampaignData.endDate) {
    returnVal.status = true;
    returnVal.errorMsg.endDate = "Required*";
  }

  return returnVal;
};

export const addLocationsValidation = (
  addLocationData: addCampaignLocationPramstate
): {
  status: boolean;
  errorMsg: { [key in keyof addCampaignLocationPramstate]: string };
} => {
  const returnVal = {
    status: false,
    errorMsg: {
      city: "",
      state: "",
      district: "",
      campaignArea: "",
    },
  };
  if (!addLocationData.state) {
    returnVal.status = true;
    returnVal.errorMsg.state = "Required*";
  }
  if (!addLocationData.district) {
    returnVal.status = true;
    returnVal.errorMsg.district = "Required*";
  }
  if (!addLocationData.city) {
    returnVal.status = true;
    returnVal.errorMsg.city = "Required*";
  }
  if (!addLocationData.campaignArea?.length) {
    returnVal.status = true;
    returnVal.errorMsg.campaignArea = "Required*";
  }

  return returnVal;
};

export const addCheckListValidation = (
  checkListData: {
    field_name: string;
    field_type: string;
    is_required: boolean;
  }[]
): {
  status: boolean;
  errorMsg: { name: string; fieldType: string }[];
} => {
  const returnVal = {
    status: false,
    errorMsg: checkListData.map(() => ({
      name: "",
      fieldType: "",
    })),
  };
  checkListData.map((data, i) => {
    if (!data.field_name) {
      returnVal.status = true;
      returnVal.errorMsg[i].name = "Required*";
    }
    if (!data.field_type) {
      returnVal.status = true;
      returnVal.errorMsg[i].fieldType = "Required*";
    }
  });

  return returnVal;
};

export const deleteCampaign = async (
  id: number
): Promise<{ status: "success" | "failure" }> => {
  try {
    const res = await campaignDeleteService(id.toString());
    console.log("deleteCampaign res :", res);
    if (res?.data?.statusCode === 200) return { status: "success" };
    else return { status: "failure" };
  } catch (error) {
    return { status: "failure" };
  }
};
