import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  ActivityIndicator,
  Button,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import PlaceItem from '../../components/PlaceItem';
import {useSelector, useDispatch} from 'react-redux';
import {getPlaces} from '../../store/actions/Places';
import Colors from '../../constants/Colors';

const PlacesListScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const getPlacesData = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(getPlaces());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData().then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const places = useSelector((state) => state.places.places);

  if (!isLoading && places.length === 0) {
    return (
      <View style={styles.noProductsText}>
        <Text>No places found.! Do Add </Text>
        <Button title="Refresh" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={getPlacesData}
      refreshing={isRefreshing}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageurl}
          title={itemData.item.name}
          address={null}
        />
      )}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Places List',

    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="add"
            iconName="md-add"
            onPress={() => {
              navData.navigation.navigate({
                name: 'AddPlaces',
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
    justifyContent: 'center',
  },
});

export default PlacesListScreen;
