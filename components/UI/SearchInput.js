import React, {useState} from 'react';

//import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useLinkProps} from '@react-navigation/native';

const SearchInput = (props) => {
  const [search, setSearch] = useState();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.sectionStyle}>
          <TextInput
            style={styles.input}
            placeholder="Search Employee Name"
            underlineColorAndroid="transparent"
            onChangeText={(u) => {
              // props.onSearching(u)
              setSearch(u);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              props.onSearching(search);
            }}>
            <Ionicons
              name="ios-search"
              style={styles.imageStyle}
              size={28}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 50,
    borderRadius: 10,
    margin: 10,
  },
  imageStyle: {
    margin: 5,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 22,
    paddingLeft: 8,
  },
});

export default SearchInput;
