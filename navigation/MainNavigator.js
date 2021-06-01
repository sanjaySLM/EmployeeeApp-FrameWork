import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { PhoenixAppNavigator } from "./AppNavigator";
import  AuthNavigator from "./AuthNavigator";


const MainNavigator = (props) => {
  const isAuth = useSelector((state) => {
    return !!state.Auth.token;
  });
  return (
    <NavigationContainer>
      {isAuth && <PhoenixAppNavigator />}
      {!isAuth && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
