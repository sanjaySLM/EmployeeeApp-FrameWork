import React from "react";
import {
  Platform,
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";



import PlacesListScreen, {
  screenOptions as placesListScreenOptions,
} from "../screens/places/PlacesListScreen";

import AddPlaceScreen, {
  screenOptions as AddplacesScreenOptions,
} from "../screens/places/AddPlaceScreen";

import EmployeeListScreen, {
  screenOptions as employeeListScreenOptions,
} from "../screens/Employee/EmployeeListScreen";

import EditEmployeeScreen, {
  screenOptions as editEmployeeScreenOptions,
} from "../screens/Employee/EditEmployeeScreen";


import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
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



const SampleStackNavigator = createStackNavigator();


export const EmployeeNavigator = props => {

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



const PlacesStackNavigator = createStackNavigator();


export const PlacesNavigator = props => {

  return (
    <PlacesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <PlacesStackNavigator.Screen
        name="PlacesList"
        component={PlacesListScreen}
        options={placesListScreenOptions}
      />
          <PlacesStackNavigator.Screen
        name="AddPlaces"
        component={AddPlaceScreen}
        options={AddplacesScreenOptions}
      />
    </PlacesStackNavigator.Navigator>
  );
};














const PhoenixDrawerNavigator = createDrawerNavigator();

export const PhoenixAppNavigator = () => {
  const dispatch = useDispatch();

  return (
    <PhoenixDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: Colors.primaryColor,
                  color: "white",
                  padding: 15,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
                >
                  Phoenix
                </Text>
                <TouchableHighlight
                  underlayColor="blue"
                  onPress={() => {
                    dispatch(authActions.logout());
                  }}
                >
                  <View>
                    <Ionicons name="md-exit" size={26} color="white" />
                  </View>
                </TouchableHighlight>
              </View>
              <DrawerItemList {...props} />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primaryColor,
        activeBackgroundColor: Colors.accentColor,
        labelStyle: {
          fontSize: 16,
        },
      }}
    >

      <PhoenixDrawerNavigator.Screen
        name="Employees(sql)"
        component={EmployeeNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "person-circle-outline" : "ios-cart"}
              size={28}
              color={props.color}
            />
          ),
        }}
      />
       <PhoenixDrawerNavigator.Screen
        name="Places"
        component={PlacesNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "location" : "ios-cart"}
              size={28}
              color={props.color}
            />
          ),
        }}
      />

    </PhoenixDrawerNavigator.Navigator>





  );
};




