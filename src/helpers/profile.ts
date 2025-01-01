import {
  businessProfileParams,
  companyFilesParams,
  pointOfContactParams,
  profileErrorState,
} from "@typings/profile";
import { emailRegex } from "@utils/HelperMethods";

export const editProfileValidation = (
  userProfileDatas: businessProfileParams &
    pointOfContactParams &
    companyFilesParams
): {
  status: boolean;
  errorMsg: profileErrorState;
} => {
  const returnVal = {
    status: false,
    errorMsg: {
      business_name: "",
      website_url: "",
      company_phone: "",
      company_landline: "",
      company_email: "",
      address: "",
      country: "",
      state: "",
      zip_code: "",
      first_name: "",
      last_name: "",
      designation: "",
      phone: "",
      email: "",
      gst: "",
      pan: "",
      company_file_ref: "",
      business_category: "",
    },
  };
  if (!userProfileDatas.company_email?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.company_email = "Email id is required";
  } else if (!emailRegex.test(userProfileDatas.company_email?.trim())) {
    returnVal.status = true;
    returnVal.errorMsg.company_email = "Invalid email id ";
  }
  if (!userProfileDatas.email?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.email = "Email id is required";
  } else if (!emailRegex.test(userProfileDatas.email?.trim())) {
    returnVal.status = true;
    returnVal.errorMsg.email = "Invalid email id ";
  }
  if (!userProfileDatas.business_name?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.business_name = "Business name is required";
  }
  // if (!userProfileDatas.business_category?.trim()) {
  //   returnVal.status = true;
  //   returnVal.errorMsg.business_category = "Business category is required";
  // }
  if (!userProfileDatas.website_url?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.website_url = "Website name is required";
  }
  if (!userProfileDatas.company_phone?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.company_phone = "Phone number is required";
  }
  if (!userProfileDatas.company_landline?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.company_landline = "Landline is required";
  } 
  if (!userProfileDatas.address?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.address = "Address is required";
  }
  if (!userProfileDatas.state?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.state = "State is required";
  }
  if (!userProfileDatas.zip_code?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.zip_code = "Zip code is required";
  }
  // if (!userProfileDatas.company_file_ref?.trim()) {
  //   returnVal.status = true;
  //   returnVal.errorMsg.company_file_ref = "Company file is required";
  // }
  if (!userProfileDatas.first_name?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.first_name = "First name is required";
  }
  if (!userProfileDatas.last_name?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.last_name = "Last name is required";
  }
  if (!userProfileDatas.designation?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.designation = "Designation is required";
  }
  if (!userProfileDatas.phone?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.phone = "Phone number is required";
  }
  if (!userProfileDatas.gst?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.gst = "GST is required";
  }
  if (!userProfileDatas.pan?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.pan = "Pan number is required";
  }
  return returnVal;
};
