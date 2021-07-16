import React from 'react';
import {View, StyleSheet} from 'react-native';
import PDFReader from 'rn-pdf-reader-js';

const PdfViewer = (props) => {
  const uri = props.route.params.item;
  return (
    <View style={styles.container}>
      <PDFReader source={{uri: uri}} />
    </View>
  );
};
export default PdfViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
