import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';


export default function App() {
 let cameraRef = useRef();
 const [hasCameraPermission, setHasCameraPermission] = useState();
 const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

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
    quality: 1,
    base64: true,
    exit: false,
  };

  let newPhoto = await cameraRef.current.takePictureAsync(options);
  setPhoto(newPhoto);
 };

 if (photo) {
  let sharePic = () => {
    shareAsync(photo.uri).then(() => {
      setPhoto(undefined);
    })
  };

  let savePhoto = () => {
    MediaLibrary.saveTo
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.preview} source={{ uri: "data:image/png;base64" + photo.base64 }} />
      <Button title='share' onPress={sharePic} />
      {hasMediaLibraryPermission ? <Button title='Save' onPress={savePhoto} /> : undefined }
      <Button title='Discard' onPress={() => setPhoto(undefined)} />
    </SafeAreaView>
  );
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
  },
  preview: {
    alignSelf: 'stretch',

  }
});
