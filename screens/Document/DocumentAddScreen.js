import { View, Alert, Text, Button } from 'react-native';
import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { addDocument } from '../../store/actions/Document'
import { useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";

const DocumentAddScreen = () => {
    const [doc, setDoc] = useState();
    const [documentName, setDocumentName] = useState('');
    const [documentUri, setDocumentUri] = useState('');


    const dispatch = useDispatch()
    const navigation = useNavigation();
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
            if (response.type == 'success') {
                let { name, size, uri } = response;
                let nameParts = name.split('.');
                let fileType = nameParts[nameParts.length - 1];
                var fileToUpload = {
                    name: name,
                    size: size,
                    uri: uri,
                    type: "application/" + fileType
                };
                setDoc(fileToUpload);
                setDocumentName(fileToUpload.name)
                setDocumentUri(fileToUpload.uri)
            }
        });
        console.log('DOCUMENT FETCHED')
    }

    const postDocument = async () => {
        if (documentUri.length > 0 && documentName.length > 0) {
            await dispatch(addDocument(documentName, documentUri))
            navigation.goBack()
        } else {
            Alert.alert('You Did Not Select Any File')
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>PIck up the File and Upload Here...</Text>
            <View style={{ flexDirection: 'row', }}>
                <View style={{ width: '30%', marginHorizontal: '2%', marginVertical: '2%' }}><Button title="Pick File" onPress={pickDocument} /></View>
                <View style={{ width: '30%', marginHorizontal: '2%', marginVertical: '2%' }}><Button title="Upload" onPress={postDocument} /></View>
            </View>
        </View>
    )
};



export const screenOptions = (navData) => {
    return {
        headerTitle: 'Add Document',
    };
};

export default DocumentAddScreen;