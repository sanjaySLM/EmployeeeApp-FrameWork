import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import { WebView } from "react-native-webview";

const PdfViewer = (props) => {
    const item = props.route.params.item;
    console.log(item);
    return (
      <View style={styles.container}>
        <WebView
            style={{flex: 1, backgroundColor: 'white'}}
            source={{
              // uri: `http://30.30.30.82/Document/${item}`,
              uri: `http://docs.google.com/gview?embedded=true&url=https://file-examples-com.github.io/uploads/2017/10/${item}.pdf`,
            }}
            bounces={true}
            useWebKit={true}
            scrollEnabled={true}
          />
      </View>
    );
  }
export default PdfViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
  },
});
