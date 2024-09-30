import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";

export const emailRegex =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const network = () =>
  NetInfo.fetch().then((state) => {
    if (state.isConnected === false)
      Alert.alert("Network Error", "Check your conection and try again.");
  });
