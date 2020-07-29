import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';

const FrontFaceCamera = () => {
  // for demo, doesn't work though
  // TODO: add face detection with ML Kit
  const takePicture = async camera => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
  };

  const PendingView = () => (
    <View style={styles.camera}>
      <Text>Loading...</Text>
    </View>
  );

  return (
    <RNCamera
      style={styles.camera}
      type={RNCamera.Constants.Type.front}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}>
      {({camera, status}) => {
        if (status !== 'READY') {
          return <PendingView />;
        }
        return (
          <View style={styles.snapButton}>
            <TouchableOpacity
              onPress={() => takePicture(camera)}
              style={styles.capture}>
              <Text style={styles.snapText}> SNAP </Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  snapButton: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  snapText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default FrontFaceCamera;
