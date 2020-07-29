import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import theme from '../../../theme';

const FrontFaceCamera = () => {
  const [faceRecognized, setFaceRecognized] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const takePicture = async camera => {
    const options = {quality: 0.5, base64: true};
    try {
      const data = await camera.takePictureAsync(options);
      if (data) {
        setPreviewImage(data.uri);
      }
    } catch (errorCapture) {
      console.warn(errorCapture);
    }
  };

  const onFaceDetected = ({faces}) => {
    if (faces[0]) {
      // keep this for later reference
      // this.setState({
      //   box: {
      //     width: faces[0].bounds.size.width,
      //     height: faces[0].bounds.size.height,
      //     x: faces[0].bounds.origin.x,
      //     y: faces[0].bounds.origin.y,
      //     yawAngle: faces[0].yawAngle,
      //     rollAngle: faces[0].rollAngle,
      //   },
      // });
      setFaceRecognized(true);
    } else {
      setFaceRecognized(false);
    }
  };

  const recapture = () => {
    setPreviewImage(null);
  };

  const PendingView = () => (
    <View style={styles.camera}>
      <Text>Loading...</Text>
    </View>
  );

  if (previewImage) {
    return (
      <ImageBackground source={{uri: previewImage}} style={styles.camera}>
        <View style={styles.snapButton}>
          <TouchableOpacity onPress={recapture} style={styles.capture}>
            <Text style={styles.snapText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <RNCamera
      style={styles.camera}
      type={RNCamera.Constants.Type.front}
      onFacesDetected={onFaceDetected}
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
          faceRecognized && (
            <View style={styles.snapButton}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={styles.snapText}>Snap</Text>
              </TouchableOpacity>
            </View>
          )
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
    position: 'absolute',
    bottom: 20,
    backgroundColor: theme.palette.primary.red,
    padding: 15,
    borderRadius: 16,
  },
  snapText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
});

export default FrontFaceCamera;
