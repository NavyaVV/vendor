import { couponValidateService } from "@config/services/payment";

export const couponValidate = async (
  arg: string
): Promise<{ status: "success" | "failure" }> => {
  try {
    const res = await couponValidateService(arg);
    if (res?.data?.statusCode === 200) return { status: "success" };
    else return { status: "failure" };
  } catch (error) {
    return { status: "failure" };
  }
};
