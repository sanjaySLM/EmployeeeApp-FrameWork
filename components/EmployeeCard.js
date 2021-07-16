/* eslint-disable react/prop-types */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableNativeFeedback,
} from 'react-native';
import Colors from '../constants/Colors';
const EmployeeCard = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onSelect} useForeground>
      <View style={styles.product}>
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{props.name}</Text>
            <Text style={styles.text}>{props.gender}</Text>
            <Text style={styles.text}>
              $ {parseFloat(props.salary).toFixed(2)}
            </Text>
            <Text style={styles.text}>{props.doj}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Edit"
              onPress={props.onSelect}
              color={Colors.primaryColor}
            />
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};
const styles = StyleSheet.create({
  product: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 120,
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'open-sans',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  textContainer: {
    marginVertical: 5,
    width: '30%',
    padding: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    marginLeft: '25%',
  },
});
export default EmployeeCard;
