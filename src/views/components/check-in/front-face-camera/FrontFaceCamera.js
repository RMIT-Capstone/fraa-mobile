import React from 'react';
import {func, bool, arrayOf, object, string} from 'prop-types';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import styles from './FrontFaceCameraStyle';
import {RNCamera} from 'react-native-camera';
import LottieView from 'lottie-react-native';
const GenericLoading = require('../../../../assets/lottie-assets/GenericLoading');

const FrontFaceCamera = ({recognizedFaces, previewImage, loading, takePicture, recapture, onFacesDetected}) => {
  const RenderFaceBounds = () => {
    return recognizedFaces.map((face, index) => (
      <View
        key={index}
        style={[
          styles.faceBounds,
          {
            height: parseFloat(face.bounds.size.height),
            width: parseFloat(face.bounds.size.width),
            left: parseFloat(face.bounds.origin.x),
            top: parseFloat(face.bounds.origin.y),
          },
        ]}
      />
    ));
  };

  const PendingView = () => (
    <View style={styles.camera}>
      <Text>Loading Camera...</Text>
    </View>
  );

  const SnapButton = ({camera}) => (
    <TouchableOpacity onPress={() => takePicture(camera)} style={styles.snapButton}>
      {loading ? (
        <LottieView source={GenericLoading} autoPlay loop style={styles.lottieView} />
      ) : (
        <Text style={styles.snapText}>Snap</Text>
      )}
    </TouchableOpacity>
  );

  SnapButton.propTypes = {
    camera: object.isRequired,
  };

  const TooManyFaces = () => (
    <View style={styles.tooManyFacesView}>
      <Text style={styles.tooManyFacesText}>There are too many faces!</Text>
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
      onFacesDetected={onFacesDetected}
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
              <RenderFaceBounds />
              {recognizedFaces.length === 1 && <SnapButton camera={camera} />}
              {recognizedFaces.length > 1 && <TooManyFaces />}
            </>
          )
        );
      }}
    </RNCamera>
  );
};

FrontFaceCamera.propTypes = {
  recognizedFaces: arrayOf(object).isRequired,
  previewImage: string.isRequired,
  loading: bool.isRequired,
  takePicture: func.isRequired,
  recapture: func.isRequired,
  onFacesDetected: func.isRequired,
};

export default FrontFaceCamera;
