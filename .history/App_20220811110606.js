import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';


export default function App() {
 let cameraRef = useRef();
 const [hasCameraPermission, setHasCameraPermission] = useState();
 const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

 useEffect (() => {
  (async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
    setHasCameraPermission(cameraPermission.status === 'granted');
    setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
  })();
 }, []);

 if (hasCameraPermission === undefined) {
  return <Text>Requesting Permission...</Text>
 } else if (!hasCameraPermission) {
  return <Text>Permission for Camera not granted, Please allow Permission</Text>
 }

 let takePic = async () => {
  let options = {
    qu
  }
 }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Button title='Take Picture' onClick={takePic} />
        </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  }
});
