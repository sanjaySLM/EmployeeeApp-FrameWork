import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import {
  Platform,
  SafeAreaView,
  Button,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";


import EmployeeListScreen ,{
  screenOptions as employeeListScreenOptions,
} from "../screens/Employee/EmployeeListScreen";

import EditEmployeeScreen ,{
  screenOptions as editEmployeeScreenOptions,
} from "../screens/Employee/EditEmployeeScreen";

import Colors from "../constants/Colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
};


export const SampleNavigator = () => {
  const SampleStackNavigator = createStackNavigator();
  return (
    <SampleStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <SampleStackNavigator.Screen
        name="EmployeeList"
        component={EmployeeListScreen}
        options={employeeListScreenOptions}
      />
      <SampleStackNavigator.Screen
        name="EditScreen"
        component={EditEmployeeScreen}
        options={editEmployeeScreenOptions}
      />
    </SampleStackNavigator.Navigator>
  );
};




