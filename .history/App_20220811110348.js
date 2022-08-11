import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
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

  return (
    <Camera style={styles.container}>
      <View style={styles.buttonContainer}>
        
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
});
