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

import DocumentPicker, {
  screenOptions as DocumentPickerScreenOptions,
} from "../screens/Document/DocumentPicker";

import DocumentAddScreen, {
  screenOptions as DocumentAddScreenOptions,
} from "../screens/Document/DocumentAddScreen";

import AboutDeviceScreen, {
  screenOptions as AboutDeviceScreenOptions,
} from "../screens/About/AboutDeviceScreen";


import HtmlScreen, {
  screenOptions as HtmlScreenOptions,
} from "../screens/Html/htmlScreen";

import HtmlViewer, {
  screenOptions as formOptions,
} from "../components/htmlViewer";


import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import Colors from "../constants/Colors";
import PdfViewer from "../components/PdfViewer";



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


const DocumentStackNavigator = createStackNavigator();


export const DocumentNavigator = props => {

  return (
    <DocumentStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <DocumentStackNavigator.Screen
        name="DocumentPicker"
        component={DocumentPicker}
        options={DocumentPickerScreenOptions}
      />
      <DocumentStackNavigator.Screen
        name="DocumentAdd"
        component={DocumentAddScreen}
        options={DocumentAddScreenOptions}
      />
      <DocumentStackNavigator.Screen
        name="PdfView"
        component={PdfViewer}
      />
    </DocumentStackNavigator.Navigator>
  );
};



const AboutDeviceStackNavigator = createStackNavigator();

export const AboutDeviceNavigator = props => {

  return (
    <AboutDeviceStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AboutDeviceStackNavigator.Screen
        name="AboutDevice"
        component={AboutDeviceScreen}
        options={AboutDeviceScreenOptions}
      />

    </AboutDeviceStackNavigator.Navigator>
  );
};






const HtmlStackNavigator = createStackNavigator();

export const HtmlNavigator = props => {

  return (
    <HtmlStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <HtmlStackNavigator.Screen
        name="HtmlListScreen"
        component={HtmlScreen}
        options={HtmlScreenOptions}
      />

      <HtmlStackNavigator.Screen
        name="HtmlView"
        component={HtmlViewer}
        options={formOptions}
      />
    </HtmlStackNavigator.Navigator>
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
      <PhoenixDrawerNavigator.Screen
        name="Documents"
        component={DocumentNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "document-attach" : "document-attach"}
              size={28}
              color={props.color}
            />
          ),
        }}
      />

      <PhoenixDrawerNavigator.Screen
        name="Forms"
        component={HtmlNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-logo-html5" : "md-logo-html5"}
              size={28}
              color={props.color}
            />
          ),
        }}
      />
      <PhoenixDrawerNavigator.Screen
        name="About Device"
        component={AboutDeviceNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "information-circle" : "information-circle"}
              size={28}
              color={props.color}
            />
          ),
        }}
      />
    </PhoenixDrawerNavigator.Navigator>





  );
};




