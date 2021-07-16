import React from 'react';
import {View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const test = `
<!DOCTYPE html>
<html>
<head>
<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'>
<link rel='stylesheet' href='https://unpkg.com/formiojs@latest/dist/formio.full.min.css'>
<script src='https://unpkg.com/formiojs@latest/dist/formio.full.min.js'></script>
</head>
<body>
<div id="formio"></div> 
</body>
</html>
`;

const HtmlViewer = (props) => {
  const webviewRef = React.useRef(null);
  const navigation = useNavigation();
  const jsonForm = useSelector((state) => {
    return state.JsonData.jsonData;
  });

  function onMessage(data) {
    navigation.navigate({
      name: 'HtmlListScreen',
    });
  }

  function injectJs() {
    const javaData = `try {
        window.postMessage(document.cookie)
        Formio.createForm(document.getElementById('formio'), ${jsonForm})
        .then(function (form) {
            form.on('submit', function (submission) {
                window.ReactNativeWebView.postMessage(JSON.stringify(submission));
            });
        });
    } catch (e) {
        alert(e);
    }`;
    return javaData;
  }

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{
          baseUrl: 'http://30.30.30.62',
          html: test,
        }}
        scalesPageToFit={false}
        startInLoadingState={true}
        ref={webviewRef}
        onMessage={onMessage}
        injectedJavaScript={injectJs()}
      />
    </View>
  );
};

export default HtmlViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Form',
  };
};
