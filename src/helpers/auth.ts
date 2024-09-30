import {
  loginErrorState,
  loginParams,
  resetPwdErrorState,
  resetPwdParams,
} from "@typings/auth";
import { emailRegex } from "@utils/HelperMethods";
import {
  resetPasswordService,
  forgotPasswordService,
} from "@config/services/auth";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import moment from "moment";
import { State } from "@typings/State";
import { store } from "@store/store";
import { logout, refreshToken } from "@store/reducers/auth";

const sendOtp = async (
  email: string
): Promise<{ status: "success" | "failure" }> => {
  try {
    const res = await forgotPasswordService({ email });
    if (res?.data?.statusCode === 200) return { status: "success" };
    else return { status: "failure" };
  } catch (error) {
    return { status: "failure" };
  }
};

const resetPassword = async (
  password: string,
  token: string
): Promise<{ status: "success" | "failure" }> => {
  try {
    const res = await resetPasswordService({ password, token });
    if (res?.data?.statusCode === 200) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Your password is updated successfully.",
      });
      return { status: "success" };
    } else return { status: "failure" };
  } catch (error) {
    return { status: "failure" };
  }
};

const loginValidation = ({
  email,
  phone,
}: loginParams): { status: boolean; errorMsg: loginErrorState } => {
  const returnVal = { status: false, errorMsg: { email: "", phone: "" } };
  if (!!email && !email?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.email = "ERROR_EMAIL_REQ";
  } else if (!!email && !emailRegex.test(email?.trim())) {
    returnVal.status = true;
    returnVal.errorMsg.email = "Invalid email id ";
  }

  if (!!phone && !phone?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.phone = "Phone number is required";
  } else if (!!phone && phone.length < 10) {
    returnVal.status = true;
    returnVal.errorMsg.phone = "Phone number is not valid";
  }
  return returnVal;
};

const resetPasswordValidation = ({
  password,
  confirmPassword,
}: resetPwdParams): { status: boolean; errorMsg: resetPwdErrorState } => {
  const returnVal = {
    status: false,
    errorMsg: { password: "", confirmPassword: "" },
  };
  if (!password?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.password = "Password required";
  }

  if (!confirmPassword?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.confirmPassword = "Password required";
  } else if (password !== confirmPassword) {
    returnVal.status = true;
    returnVal.errorMsg.confirmPassword = "Password dosn't match";
  }
  return returnVal;
};

const forgotPasswordValidation = ({
  email,
}: loginParams): { status: boolean; errorMsg: loginErrorState } => {
  const returnVal = {
    status: false,
    errorMsg: { email: "" },
  };
  if (!email?.trim()) {
    returnVal.status = true;
    returnVal.errorMsg.email = "ERROR_EMAIL_REQ";
  } else if (!emailRegex.test(email?.trim())) {
    returnVal.status = true;
    returnVal.errorMsg.email = "Invalid email id ";
  }
  return returnVal;
};

const generateRandomCode = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const getTimeDifference = (then: moment.Moment) => {
  const ms = moment(moment(), "MM/DD/YYYY HH:mm:ss").diff(
    moment(then, "MM/DD/YYYY HH:mm:ss")
  );
  const duration = moment.duration(ms);
  const seconds = Math.floor(duration.asSeconds());

  return `${seconds}`.replace("-", "");
};

const getToken = async () => {
  const state: State = store.getState();
  if (state.auth.token) {
    const expired = moment(state.auth.token.access_token_expiry)
      .add(5, "minutes")
      .isSameOrBefore(moment());
    if (expired) {
      if (state.auth.authCode) {
        const authCodeExpired = moment(state.auth.authCode.access_token_expiry)
          .add(5, "minutes")
          .isSameOrBefore(moment());
        if (authCodeExpired) store.dispatch(logout());
        else {
          let accessToken = undefined;
          await store.dispatch(
            refreshToken({
              callback: (token) => {
                accessToken = token;
              },
            })
          );
          return accessToken;
        }
      }
    } else return state.auth.token.access_token;
  }
};

export {
  sendOtp,
  resetPassword,
  loginValidation,
  resetPasswordValidation,
  forgotPasswordValidation,
  generateRandomCode,
  getTimeDifference,
  getToken,
};
