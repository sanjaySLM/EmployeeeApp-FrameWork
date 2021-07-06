// Pushing but not updating - Let me see if it works
// After training
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStore, combineReducers, applyMiddleware } from "redux";

import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import Colors from "./constants/Colors";
import MainNavigator from "./navigation/MainNavigator";
import EmployeeListReducer from "./store/reducers/EmployeeList";
import AuthReducer from './store/reducers/auth';
import PlaceReducer from './store/reducers/Places';
import DocumentReducer from "./store/reducers/Document";



const rootReducer = combineReducers({
  EmployeeList: EmployeeListReducer,
  Auth: AuthReducer,
  places:PlaceReducer,
  DocumentList: DocumentReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          return setFontLoaded(true);
        }}
        onError={() => {
          console.log("Error");
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.accentColor,
    alignItems: "center",
    justifyContent: "center",
  },
});

