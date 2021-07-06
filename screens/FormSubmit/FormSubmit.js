import React, { useState, useEffect, useCallback } from 'react';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { Text, View, StyleSheet, Image, Button, TouchableNativeFeedback } from 'react-native';
// import {Formio} from 'react-native-formio';

const FormSubmit=()=>{
return(
  <Text>Sanjay</Text>
    
  
  )
}

export const screenOptions = (navData) => {
    return {
      headerTitle: 'Forms',
     
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName="md-menu"
              onPress={() => {
                navData.navigation.toggleDrawer();
              }}
            />
          </HeaderButtons>
        );
      },
    };
  };
export default FormSubmit;

