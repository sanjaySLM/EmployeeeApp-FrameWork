import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, StyleSheet, ScrollView, Text, TextInput, Button } from 'react-native';
import ImgPicker from '../../components/ImgPicker'
import { useDispatch } from 'react-redux';
import Colors from "../../constants/Colors";
import {addPlace} from '../../store/actions/Places'

const AddPlaceScreen = props => {

    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const dispatch = useDispatch()

    const titleChangeHandler = text => {
        setTitleValue(text);
    };

    const imageTakenHandler = (imagePath) => {
        setSelectedImage(imagePath)
    }


    const savePlaceHandler = () => {
        if (titleValue.length > 0){
        dispatch(addPlace(titleValue, selectedImage))
        props.navigation.goBack()
    }else{
        Alert.alert('Enter Values Correctly', [{ text: 'ok' }])
    }

    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImgPicker onImageTaken={imageTakenHandler} />
                <Button title="Save Place" color={Colors.primaryColor} onPress={savePlaceHandler} />
            </View>
        </ScrollView>
    );
}


export const screenOptions = (navData) => {
    return {
        headerTitle: "Add Place",
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});


export default AddPlaceScreen;