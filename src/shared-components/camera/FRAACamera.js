import React from 'react';
import { arrayOf, object, func, bool } from 'prop-types';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import LottieView from 'lottie-react-native';
import { RNCamera } from 'react-native-camera';
import styles from './FRAACameraStyle';

const GenericLoading = require('../../assets/lottie-assets/GenericLoading');

const FRAACamera = ({
  previewImage,
  loading,
  recognizedFaces,
  fromHome,
  onFacesDetected,
  onFacesVerified,
  verifyResult,
  path,
  userID,
  takePicture,
  recapture,
  registerOrVerifyIdentity,
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
    <View style={styles.camera}>
      <Text>Loading Camera...</Text>
    </View>
  );

  const CameraMessage = () => (
    <View style={styles.cameraMessageContainer}>
      <Text style={styles.cameraMessage}>Place your face in the frame</Text>
    </View>
  );

  const SnapButton = ({ camera }) => (
    <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
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

  if (previewImage.uri) {
    return (
      <ImageBackground source={{ uri: previewImage.uri }} style={styles.camera}>
        <View style={styles.snapButtonRow}>
          <TouchableOpacity onPress={registerOrVerifyIdentity} style={styles.recapture}>
            {loading ? (
              <LottieView source={GenericLoading} autoPlay loop style={styles.lottieView} />
            ) : (
              <Text style={styles.snapText}>{!fromHome ? 'Verify' : 'Register'}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={recapture} style={styles.recapture}>
            <Text style={styles.snapText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  if (!fromHome) {
    return (
      <RNCamera
        style={styles.camera}
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
        {({ camera, status }) => {
          if (status !== 'READY') {
            return <PendingView />;
          }
          return (
            <>
              <CameraMessage />
              {recognizedFaces.length !== 0 && (
                <>
                  <FaceBounds />
                  {recognizedFaces.length === 1 && <SnapButton camera={camera} />}
                  {recognizedFaces.length > 1 && <TooManyFaces />}
                </>
              )}
            </>
          );
        }}
      </RNCamera>
    );
  }

  return (
    <RNCamera
      style={styles.camera}
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
            <CameraMessage />
            {recognizedFaces.length !== 0 && (
              <>
                <FaceBounds />
                {recognizedFaces.length === 1 && <SnapButton camera={camera} />}
                {recognizedFaces.length > 1 && <TooManyFaces />}
              </>
            )}
          </>
        );
      }}
    </RNCamera>
  );
};

FRAACamera.propTypes = {
  previewImage: object.isRequired,
  loading: bool.isRequired,
  recognizedFaces: arrayOf(object).isRequired,
  fromHome: bool.isRequired,
  onFacesDetected: func.isRequired,
  takePicture: func.isRequired,
  recapture: func.isRequired,
  registerOrVerifyIdentity: func.isRequired,
};

export default FRAACamera;
