import * as Device from 'expo-device';
import * as React from 'react';
import {  ScrollView, View, StyleSheet, Text,Platform,SafeAreaView  } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons'

const AboutDeviceScreen = props => {

  const deviceTypeMap = {
    [Device.DeviceType.UNKNOWN]: 'unknown',
    [Device.DeviceType.PHONE]: 'phone',
    [Device.DeviceType.TABLET]: 'tablet',
    [Device.DeviceType.DESKTOP]: 'desktop',
    [Device.DeviceType.TV]: 'tv',
  };

  function DeviceConstants({ name, value }) {
    return (
      <View style={styles.constantsContainer}>
        <Text style={{ color: Colors.primaryColor, fontSize: 18 }}>{name}</Text>
        <Text style={{ fontSize: 18 }}> {typeof value === 'boolean' ? String(value) : value}</Text>
      </View>
    );
  }
 

  function DeviceConstantsTitle({ name, brandValue, modelValue }) {
    return (
      <View style={styles.titlecontainer}>
        <Text style={{ fontSize: 18 }}> {typeof value === 'boolean' ? String(brandValue) : brandValue}</Text>
        <Text style={{ fontSize: 20 }}> {typeof value === 'boolean' ? String(modelValue) : modelValue}</Text>
      </View>
    );
  }

  function DeviceMethods({ name = '', method }) {
    const [value, setValue] = React.useState('');
const [answerShown ,setAnswerShown ] = React.useState(false);
    const getValueAsync = async () => {
      setAnswerShown(!answerShown)
      let value
      try {
        value = await method();
        if (typeof value === 'boolean') {
          value = value.toString();
        } else if (Array.isArray(value)) {
          value = value.join('\n');
        }
      } catch (error) {
        alert(error);
        value = error.message;
      }
      setValue(value);
      console.log(value)
    };

    return (
      <View style={{ marginBottom: 20,height: answerShown ? 60: 45,borderBottomWidth: 1}}>
        <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{ color: Colors.primaryColor ,fontSize:18 }}>{name}</Text>
          <Ionicons onPress={getValueAsync} name={answerShown ?'chevron-up':'chevron-down-outline'} size={24} color={Colors.primaryColor} />
        </View>
        {answerShown ? <Text style={{marginLeft:30, fontSize:18}}>{value}</Text> : null}
      </View>
    );
  }
  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={{ padding: 12 }}>
      <DeviceConstantsTitle name="Device Brand" brandValue={Device.brand} modelValue={Device.modelName} />
      <DeviceConstants name="Device Name" value={Device.deviceName} />
      <DeviceConstants name="Device manufacturer" value={Device.manufacturer} />
      <DeviceConstants name="Device os name" value={Device.osName} />
      <DeviceConstants name="Device total Memory" value={Device.totalMemory} />
      <DeviceConstants name="Device isDevice" value={Device.isDevice} />
     {Platform.OS==='android' ? null : <DeviceConstants name="Device modelId" value={Device.modelId} />} 
     {/* <DeviceConstants name="osBuildFingerprint" value={Device.osBuildFingerprint} /> */}
      {/* <DeviceConstants
        name="Device supportedCpuArchitectures"
        value={Device.supportedCpuArchitectures}
      /> */}
      <DeviceConstants name="Device designName" value={Device.designName} />
      <DeviceConstants name="Device osBuildId" value={Device.osBuildId} />
      <DeviceConstants name="Device productName" value={Device.productName} />
      <DeviceConstants name="Device platformApiLevel" value={Device.platformApiLevel} />
      <DeviceConstants name="Device osVersion" value={Device.osVersion} />
      <DeviceConstants name="Device osInternalBuildId" value={Device.osInternalBuildId} />
   
   
      <DeviceMethods name="Device Type" method={async () => deviceTypeMap[await Device.getDeviceTypeAsync()]} />
      <DeviceMethods name="getUptime" method={Device.getUptimeAsync}/>
      {/* <DeviceMethods name="Device get system features" method={Device.getPlatformFeaturesAsync} /> */}
      <DeviceMethods name="Device get max memory" method={Device.getMaxMemoryAsync} />
      <DeviceMethods name="Device is sideloading enabled" method={Device.isSideLoadingEnabledAsync}/>
      <DeviceMethods name="Device is rooted experimental" method={Device.isRootedExperimentalAsync}/>
    </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  titlecontainer: {
    marginBottom: 25,
    height: '14%',
    width: '50%',
    marginHorizontal: '25%',
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5000,
    borderStyle: 'dashed',
    backgroundColor: Colors.accentColor
  },
  constantsContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    height: 45,
    justifyContent: 'space-between',
    borderBottomWidth: 0.5
  },
  methodsContainer:{
      marginBottom: 15,
      height: 50,
      borderBottomWidth: 0.5
  }
})

export const screenOptions = (navData) => {
  return {
    headerTitle: 'About Device',
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

export default AboutDeviceScreen;