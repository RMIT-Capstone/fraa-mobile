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
  const [recognizedFaces, setRecognizedFaces] = useState([]);
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
    if (faces) {
      setRecognizedFaces(faces);
    } else {
      setRecognizedFaces([]);
    }
  };

  const renderFaceBounds = () => {
    return recognizedFaces.map((face, index) => (
      <View
        key={index}
        style={[
          styles.faceBounds,
          {
            height: parseInt(face.bounds.size.height, 10),
            width: parseInt(face.bounds.size.width, 10),
            left: parseInt(face.bounds.origin.x, 10),
            top: parseInt(face.bounds.origin.y, 10),
          },
        ]}
      />
    ));
  };

  const recapture = () => {
    setPreviewImage(null);
  };

  const PendingView = () => (
    <View style={styles.camera}>
      <Text>Loading Camera...</Text>
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
      type={RNCamera.Constants.Type.back}
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
          recognizedFaces.length !== 0 && (
            <>
              {renderFaceBounds()}
              {recognizedFaces.length === 1 && (
                <View style={styles.snapButton}>
                  <TouchableOpacity
                    onPress={() => takePicture(camera)}
                    style={styles.capture}>
                    <Text style={styles.snapText}>Snap</Text>
                  </TouchableOpacity>
                </View>
              )}
              {recognizedFaces.length > 1 && (
                <View style={styles.tooManyFacesView}>
                  <Text style={styles.tooManyFacesText}>
                    There are too many faces!
                  </Text>
                </View>
              )}
            </>
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
  faceBounds: {
    borderWidth: 1.5,
    position: 'absolute',
    borderColor: theme.palette.secondary.yellow,
  },
  tooManyFacesView: {
    backgroundColor: theme.palette.primary.red,
    padding: 15,
    borderRadius: 10,
  },
  tooManyFacesText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default FrontFaceCamera;
