import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { useDispatch, useSelector } from 'react-redux';
import { deleteDocument, getDocumentList } from '../../store/actions/Document'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DocumentPicker = props => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const navigation = useNavigation();




  const getDocumentData = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(getDocumentList());
    } catch (err) {
      console.log(err.message);
      setError(err.message)
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    getDocumentData().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, getDocumentData]);



  //   useEffect(()=>{

  //     const willFocussub = navigation.addListener(
  //         'focus',
  //         getDocumentData
  //     )
  //     return ()=>{
  //         willFocussub.remove()
  //     }
  // },[getDocumentData])


  const documentData = useSelector((state) => {
    return state.DocumentList.documentList;
  });


  const handleSelect = async uri => {
    try {
      navigation.navigate({
        name: "PdfView",
        params: {
          item: uri //pass selectedpdf,
        }
      });
    } catch (e) {
      console.error("Couldn't load pdf", e);
    }
  };



  const handleDelete = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?',
      [
        { text: 'NO', style: 'default' },
        {
          text: 'YES',
          style: 'destructive',
          onPress: async () => {
            await dispatch(deleteDocument(id))
            getDocumentData()
          }
        }
      ])
  }
  if (documentData.length === 0) {
    return (<View style={styles.emptyContainer}><Text>DO ADD DOCUMENTS</Text></View>)
  }

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={getDocumentData}
        refreshing={isRefreshing}
        data={documentData}
        keyExtractor={item => item.id}
        renderItem={(itemData, index) =>
          <TouchableOpacity style={styles.box} onPress={() => handleSelect(itemData.item.uri)}>
            <MaterialCommunityIcons name="pdf-box" size={33} color='#26495c' style={{ marginLeft: 5 }} />
            <Text style={{ fontSize: 18 }}>{itemData.item.name}</Text>
            <TouchableOpacity style={{ paddingRight: 10, justifyContent: "center" }} onPress={() => handleDelete(itemData.item.id)}>
              <Ionicons name="trash-outline" size={30} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>}

      />
    </View>
  )
}


export const screenOptions = (navData) => {
  return {
    headerTitle: 'Documents',
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton} >
          <Item
            title="add"
            iconName="add"
            onPress={() => {
              navData.navigation.navigate({
                name: "DocumentAdd",
              });
            }}
          />
        </HeaderButtons>
      );
    },
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
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

})

export default DocumentPicker;