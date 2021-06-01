import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, StyleSheet, SafeAreaView, Text, TextInput, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import EmployeeCard from "../../components/EmployeeCard"
import { getEmployeeDetail, searchEmployee } from "../../store/actions/EmployeeList";
import Colors from "../../constants/Colors";
import SearchInput from '../../components/UI/SearchInput'

const EmployeeListScren = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const [isSearching, setIsSearching] = useState(false)




  const dispatch = useDispatch()


  const getEmployeeData = useCallback(async () => {
    setPage(1)
    setError(null);
    setIsRefreshing(true);
    setIsSearching(false)
    try {
      await dispatch(getEmployeeDetail());
    } catch (err) {
      console.log(err.message);
      setError(err.message)
    }
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getEmployeeData().then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);


  if (error) {
    return (
      <View style={styles.noProductsText}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={getEmployeeData}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  const employeeData = useSelector((state) => {
    return state.EmployeeList.employeeList;
  });

  const employeeDataSearched = useSelector((state) => {
    return state.EmployeeList.employeeListSearched;
  });

  if (!isLoading && employeeData.length === 0) {
    return <View style={styles.noProductsText}>
      <Text>No products found.! Do Add </Text>
    </View>
  }



  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  const searchHandler = async (searchData) => {
    setPage(1)
    setIsSearching(true)
    setSearch(searchData)
    setIsLoading(true)
    getSearchData(searchData, page).then(() => {
      setIsLoading(false);
    });
  }


  const getSearchData = async (searchData, page) => {
    setPage(page + 1)

    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(searchEmployee(searchData, page));
    } catch (err) {
      console.log(err.message);
      setError(err.message)
    }
    setIsRefreshing(false);
  };

  const loadMoreHandler = () => {
    if (isSearching) {
      console.log('before',page)
      setPage(page + 1)
      console.log('PageNumberAdded', page)
      getSearchData(search, page)
      console.log('SearchCalled')
    }
  }


  return <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.searchCointainer}>
      <SearchInput onSearching={searchHandler} /></View>
    <Text>{page}</Text>
    <FlatList
      onEndReachedThreshold={0.1}
      onEndReached={loadMoreHandler}
      onRefresh={getEmployeeData}
      refreshing={isRefreshing}
      data={isSearching ? employeeDataSearched: employeeData}
      keyExtractor={item => item.id}
      renderItem={itemData =>
        <EmployeeCard
          onSelect={() => {
            navigation.navigate("EditScreen", {
              id: itemData.item.id
            }
            );
          }}
          name={itemData.item.name}
          gender={itemData.item.gender}
          salary={itemData.item.salary}
          doj={itemData.item.dateOfJoin}
        />}
    />
  </SafeAreaView>
}





export const screenOptions = (navData) => {
  return {
    headerTitle: "Employee List",

    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton} >
          <Item
            title="add"
            iconName="person-add-outline"
            onPress={() => {
              navData.navigation.navigate({
                name: "EditScreen",
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
  noProductsText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  searchCointainer: {
    marginTop: 30,
    marginBottom: 22,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
})



export default EmployeeListScren;