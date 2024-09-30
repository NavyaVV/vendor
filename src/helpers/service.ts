import { serviceDeleteService } from "@config/services/service";
import { addServiceErrorState, addServiceParams } from "@typings/service";

type addServiceValidationResponse = {
  status: boolean;
  errorMsg: addServiceErrorState;
};

export const addServiceValidation = (
  addServicesData: addServiceParams
): addServiceValidationResponse => {
  const returnVal: addServiceValidationResponse = {
    status: false,
    errorMsg: {},
  };
  if (!addServicesData.service?.service_name?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.service_name = "Service name is required";
  }
  if (!addServicesData.service?.price?.toString()?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.price = "Price is required";
  }
  if (!addServicesData.service?.service_type?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.service_type = "Service type is required";
  }
  if (
    !addServicesData.service_loc?.length ||
    !addServicesData.service_loc[0].area?.trim()
  ) {
    returnVal.status = true;
    returnVal.errorMsg.service_loc = "Service type is required";
  }

  return returnVal;
};

export const deleteService = async (
  id: string
): Promise<{ status: "success" | "failure" }> => {
  try {
    const res = await serviceDeleteService(id);
    if (res?.data?.statusCode === 200) return { status: "success" };
    else return { status: "failure" };
  } catch (error) {
    return { status: "failure" };
  }
};
