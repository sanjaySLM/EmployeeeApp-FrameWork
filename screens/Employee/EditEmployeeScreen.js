import React, {useState, useCallback, useEffect, useReducer} from 'react';
import {
  Alert,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TextInput,
  Picker,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import {addEmployee, editEmployee} from '../../store/actions/EmployeeList';
import PhoenixDateTime from '../../components/UI/PhoenixDateTime';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === 'FORM_INPUT_UPDATE') {
    const updatedInputValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedInputValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedInputValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedInputValidities,
      inputValues: updatedInputValues,
    };
  }
  return state;
};
const EditEmployeeScreen = ({route, navigation, props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const {id} = route.params ? route.params : '';
  const [date, setDate] = useState('');
  const [errorText, setErrorText] = useState(true);

  let editingProduct = null;
  if (id) {
    editingProduct = useSelector((state) =>
      state.EmployeeList.employeeList.find((emp) => emp.id === id),
    );
  }
  const dispatch = useDispatch();
  const [formstate, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: editingProduct ? editingProduct.name : '',
      gender: editingProduct ? editingProduct.gender : '',
      salary: editingProduct ? editingProduct.salary : '',
      doj: editingProduct ? editingProduct.dateOfJoin : date,
    },
    inputValidities: {
      name: editingProduct ? true : false,
      gender: editingProduct ? true : false,
      salary: editingProduct ? true : false,
      doj: editingProduct ? true : false,
    },
    formIsValid: editingProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occoured', error, [{text: 'ok'}]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formstate.formIsValid) {
      setErrorText(false);
      Alert.alert('wrong input', 'update it correctly');
      return;
    }
    if (formstate.formIsValid) {
      setErrorText(true);
    }
    setError(null);
    setIsLoading(true);

    try {
      if (editingProduct) {
        await dispatch(
          editEmployee(
            id,
            formstate.inputValues.name,
            formstate.inputValues.gender,
            +formstate.inputValues.salary,
            formstate.inputValues.doj,
          ),
        );
      } else {
        await dispatch(
          addEmployee(
            formstate.inputValues.name,
            formstate.inputValues.gender,
            +formstate.inputValues.salary,
            formstate.inputValues.doj,
          ),
        );
      }
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, id, formstate]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName="checkmark-sharp"
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [submitHandler]);

  const textInputHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    if (inputIdentifier === 'gender') {
      if (text === 'Male' || text === 'Female') {
        isValid = true;
      } else {
        isValid = false;
      }
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
  const gettingDate = (mode, date) => {
    textInputHandler('doj', date.toString());
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            autoCapitalize="words"
            style={styles.input}
            value={formstate.inputValues.name}
            onChangeText={textInputHandler.bind(this, 'name')}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            autoCapitalize="words"
            style={styles.input}
            value={formstate.inputValues.gender}
            onChangeText={textInputHandler.bind(this, 'gender')}
          />
          {!formstate.inputValidities.gender && !errorText ? (
            <Text>Enter Male or Female only</Text>
          ) : null}
        </View>
        {/* <Picker
                    selectedValue={formstate.inputValues.gender}
                    style={{ height: 50, width: 150 }}
                    // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    onValueChange={(itemValue, itemIndex) => textInputHandler.bind(this, 'gender', itemValue)}
                >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                </Picker> */}
        {/* <ChonseSelect
                    height={35}
                    style={{ marginLeft: 20, marginBottom: 10 }}
                    data={data}
                    initValue={'0'}
                    onPress={() => { console.log('s') }}
                    onPress={(item) => { setGen(item.value) }}
                /> */}

        <View style={styles.formControl}>
          <Text style={styles.label}>Salary</Text>
          <TextInput
            placeholder="0000.00"
            keyboardType="decimal-pad"
            style={styles.input}
            value={formstate.inputValues.salary.toString()}
            onChangeText={textInputHandler.bind(this, 'salary')}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Date of Join</Text>
          <View style={styles.dateContainer}>
            <View style={styles.datePickerStyle}>
              <PhoenixDateTime onChangeDate={gettingDate} />
            </View>
            <View style={styles.dateTextContainer}>
              <Text
                style={
                  !formstate.inputValues.doj
                    ? styles.selectHereText
                    : styles.dateText
                }>
                {formstate.inputValues.doj
                  ? formstate.inputValues.doj
                  : '<= SELECT HERE'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params ? 'Employee edit' : 'Add Employee',
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
    height: '100%',
  },
  formControl: {
    width: '100%',
    marginTop: 10,
  },
  label: {
    marginVertical: 8,
    fontSize: 20,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 22,
  },
  headerSaveButton: {
    marginRight: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerStyle: {
    marginTop: 2,
    width: 70,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  dateTextContainer: {
    marginTop: 10,
  },
  dateText: {
    fontSize: 25,
  },
  selectHereText: {
    marginTop: 8,
    fontSize: 16,
  },
});
export default EditEmployeeScreen;
