import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../../screens/auth/Landing/Landing";
import { AuthStackParamList } from "../../typings/Navigation";
import React from "react";
import { ROUTES } from ".";
import { getExistingUser } from "@store/selector/auth";
import { useAppSelector } from "@hooks/redux";
import {
  AuthLanding,
  Contact,
  ForgotPassword,
  ResetPassword,
  OTP,
  EmailLogin,
  PhoneLogin,
} from "@screens/auth";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default () => {
  const existingUser = useAppSelector(getExistingUser);

  return (
    <AuthStack.Navigator>
      {!existingUser && (
        <AuthStack.Screen
          name={ROUTES.LANDING}
          options={{ headerShown: false }}
          component={Landing}
        />
      )}
      <AuthStack.Screen
        name={ROUTES.PHONELOGIN}
        options={{ headerShown: false }}
        component={PhoneLogin}
      />
      <AuthStack.Screen
        name={ROUTES.LOGIN}
        options={{ headerShown: false }}
        component={AuthLanding}
      />
      <AuthStack.Screen
        name={ROUTES.EMAILLOGIN}
        options={{ headerShown: false }}
        component={EmailLogin}
      />
      <AuthStack.Screen
        name={ROUTES.CONTACT}
        options={{ headerShown: false }}
        component={Contact}
      />
      <AuthStack.Screen
        name={ROUTES.FORGOTPASSWORD}
        options={{ headerShown: false }}
        component={ForgotPassword}
      />
      <AuthStack.Screen
        name={ROUTES.OTP}
        options={{ headerShown: false }}
        component={OTP}
      />
      <AuthStack.Screen
        name={ROUTES.RESETPASSWORD}
        options={{ headerShown: false }}
        component={ResetPassword}
      />
    </AuthStack.Navigator>
  );
};
