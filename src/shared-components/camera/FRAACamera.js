import React from 'react';
import { arrayOf, object, func, bool, string } from 'prop-types';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import { RNCamera } from 'react-native-camera';
import styles from './FRAACameraStyle';

const GenericLoading = require('../../assets/lottie-assets/GenericLoading');

const FRAACamera = ({
  previewUri,
  loading,
  recognizedFaces,
  fromHome,
  onFacesDetected,
  onFacesVerified,
  cameraMessage,
  path,
  userID,
  takePicture,
}) => {
  const FaceBounds = () =>
    recognizedFaces.map((face, index) => (
      <View
        /* eslint-disable-next-line react/no-array-index-key */
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

  const PendingView = () => (
    <View style={[styles.camera, styles.centered]}>
      <Text>Loading Camera...</Text>
    </View>
  );

  const TopCameraMessage = () => (
    <View style={[styles.cameraMessageContainer, styles.topCameraMessageContainer, styles.centered]}>
      <Text style={styles.cameraMessage}>{cameraMessage}</Text>
    </View>
  );

  const SnapButton = ({ camera }) => {
    if (loading) {
      return <LottieView source={GenericLoading} autoPlay loop style={styles.lottieView} />;
    }
    return <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture} />;
  };

  SnapButton.propTypes = {
    camera: object.isRequired,
  };

  if (previewUri) {
    return <ImageBackground source={{ uri: previewUri }} style={[styles.camera, styles.centered]} />;
  }

  if (!fromHome) {
    return (
      <RNCamera
        style={[styles.camera, styles.centered]}
        type={RNCamera.Constants.Type.front}
        onFacesDetected={onFacesDetected}
        onFacesVerified={onFacesVerified}
        path={path}
        // user="true_img.png"
        user={userID}
        modelURL="https://tam-terraform-state.s3-ap-southeast-1.amazonaws.com/FRAA/"
        modelFileName="mymodel112.tflite"
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
        {({ status }) => {
          if (status !== 'READY') {
            return <PendingView />;
          }
          return (
            <>
              <TopCameraMessage />
              {recognizedFaces.length !== 0 && <FaceBounds />}
            </>
          );
        }}
      </RNCamera>
    );
  }

  return (
    <RNCamera
      style={[styles.camera, styles.centered]}
      type={RNCamera.Constants.Type.front}
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
      {({ camera, status }) => {
        if (status !== 'READY') {
          return <PendingView />;
        }
        return (
          <>
            <TopCameraMessage />
            {recognizedFaces.length !== 0 && (
              <>
                <FaceBounds />
                {recognizedFaces.length === 1 && <SnapButton camera={camera} />}
              </>
            )}
          </>
        );
      }}
    </RNCamera>
  );
};

FRAACamera.propTypes = {
  previewUri: string.isRequired,
  loading: bool.isRequired,
  recognizedFaces: arrayOf(object).isRequired,
  fromHome: bool.isRequired,
  onFacesDetected: func.isRequired,
  onFacesVerified: func.isRequired,
  cameraMessage: string.isRequired,
  path: string.isRequired,
  userID: string.isRequired,
  takePicture: func.isRequired,
};

export default FRAACamera;
