import React, { FC } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { persistor, store } from "@store/store";
import { AlertNotificationRoot } from "react-native-alert-notification";

const alertColor = {
  label: "#000000",
  card: "#F6F8FC",
  overlay: "#F6F8FC",
  success: "#23BE29",
  danger: "#FF0303",
  warning: "#FFBA00",
  secondary: '#FFBA00'
};


export const AppWrapper: FC = (props) => {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AlertNotificationRoot colors={[alertColor, alertColor]}>
          <App />
        </AlertNotificationRoot>
      </PersistGate>
    </Provider>
  );
};

// import React, { FC } from "react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import App from "./App"; // Ensure this path is correct
// import { persistor, store } from "@store/store"; // Ensure the path is correct
// import { AlertNotificationRoot } from "react-native-alert-notification";

// const alertColor = {
//   label: "#000000",
//   card: "#F6F8FC",
//   overlay: "#F6F8FC",
//   success: "#23BE29",
//   danger: "#FF0303",
//   warning: "#FFBA00",
//   secondary: '#FFBA00'
// };

// export const AppWrapper: FC = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <AlertNotificationRoot colors={[alertColor, alertColor]}>
//           <App />
//         </AlertNotificationRoot>
//       </PersistGate>
//     </Provider>
//   );
// };


// import React, {FC} from 'react';
// import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/integration/react';
// import App from './App';
// import {persistor, store} from '@store/store';

// export const AppWrapper: FC = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   );
// };
