import React  from 'react';
import {  View, StyleSheet ,Text , TouchableOpacity} from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useDispatch } from 'react-redux';
import { getJsonData } from '../../store/actions/Html'
import { useNavigation } from '@react-navigation/native';


const HtmlScreen = props => {
 
const dispatch= useDispatch()
const navigation = useNavigation();

const form1='857D6DD0-E005-EA11-85DF-984BE1026FCE'
const form2='9C4C80C5-7DFC-E911-B633-984BE1026FCE'


  const handleSelect = async (formId) => {
    try {
       await dispatch(getJsonData(formId))
    navigation.navigate({
        name: "HtmlView",
      
    });
    } catch (e) {
      console.error("Couldn't load pdf", e);
    }
  };




  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.formButton} onPress={()=>{handleSelect(form1)}}><Text>Form 1</Text></TouchableOpacity>
      <TouchableOpacity style={styles.formButton} onPress={()=>{handleSelect(form2)}}><Text>Form 2</Text></TouchableOpacity>
    </View>
  )
}


export const screenOptions = (navData) => {
  return {
    headerTitle: 'HTML-Form',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems:'center',
    justifyContent:'center'
  },
  formButton:{
    borderColor:'black',
    borderWidth:1,
    backgroundColor:'#0099cc',
    width:'18%',
    alignItems:'center',
    justifyContent:'center',
    margin:10,
    height:'5%'
  }
 
})

export default HtmlScreen;