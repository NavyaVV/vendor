import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, Text } from "react-native";
import { linking, navigationRef } from "./NavigationHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROUTES } from "./routes";
import { RootStackParamList } from "../typings/Navigation";
import { enableScreens } from "react-native-screens";
import AuthNavigator from "./routes/AuthNavigator";
import DrawerNavigator from "./routes/DrawerNavigator";
import { useAppSelector } from "../hooks/redux";
import { getToken } from "@store/selector/auth";

enableScreens();
const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Root = () => {
  const token = useAppSelector(getToken);
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    const clearNavigationState = async () => {
      await AsyncStorage.removeItem(`NAVIGATION_STATE_KEY`);
      setIsNavigationReady(true);
    };

    clearNavigationState();
  }, []);

  if (!isNavigationReady) return <ActivityIndicator />;

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      fallback={<Text>Loading...</Text>}
    >
      <RootStack.Navigator>
        {!token?.access_token ? (
          <RootStack.Screen
            name={ROUTES.AUTH}
            options={{ headerShown: false }}
            component={AuthNavigator}
          />
        ) : (
          <RootStack.Screen
            name={ROUTES.APP}
            options={{ headerShown: false }}
            component={DrawerNavigator}
          />
        )} 
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Root;




// import React, { useCallback, useEffect, useState } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { InitialState, NavigationContainer } from "@react-navigation/native";
// import { ActivityIndicator, Platform, Text } from "react-native";
// import { linking, navigationRef } from "./NavigationHelper";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ROUTES } from "./routes";
// import { RootStackParamList } from "../typings/Navigation";
// import { enableScreens } from "react-native-screens";
// import AuthNavigator from "./routes/AuthNavigator";
// import DrawerNavigator from "./routes/DrawerNavigator";
// import { useAppSelector } from "../hooks/redux";
// import { getToken } from "@store/selector/auth";

// enableScreens();
// const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${Platform.Version}`;
// const RootStack = createNativeStackNavigator<RootStackParamList>();

// export const Root = () => {
//   const token = useAppSelector(getToken);
//   const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
//   const [initialState, setInitialState] = useState<InitialState | undefined>();

//   useEffect(() => {
//     const restoreState = async () => {
//       try {
//         const savedStateString = await AsyncStorage.getItem(
//           NAVIGATION_STATE_KEY
//         );
//         const state = savedStateString
//           ? JSON.parse(savedStateString)
//           : undefined;
//         setInitialState(state);
//       } finally {
//         setIsNavigationReady(true);
//       }
//     };

//     if (!isNavigationReady) restoreState();
//   }, [isNavigationReady]);
//   const onStateChange = useCallback((state: any) => {
//     AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state));
//   }, []);
//   if (!isNavigationReady) return <ActivityIndicator />;

//   return (
//     <NavigationContainer
//       linking={linking}
//       ref={navigationRef}
//       {...{ onStateChange, initialState }}
//       fallback={<Text>Loading...</Text>}
//     >
//       <RootStack.Navigator>
//         {!token?.access_token ? (
//           <RootStack.Screen
//             name={ROUTES.AUTH}
//             options={{ headerShown: false }}
//             component={AuthNavigator}
//           />
//         ) : (
//           <RootStack.Screen
//             name={ROUTES.APP}
//             options={{ headerShown: false }}
//             component={DrawerNavigator}
//           />
//         )}
//       </RootStack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default Root;
