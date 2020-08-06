import React, {useState} from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';
import styles from './FrontFaceCameraStyle';
import {RNCamera} from 'react-native-camera';
import RNLocation from 'react-native-location';
import {getDistanceFromLatLonInKm} from '../../../helpers/utils';
import LottieView from 'lottie-react-native';
const GenericLoading = require('../../../lottie-assets/GenericLoading');

const FrontFaceCamera = () => {
  const [recognizedFaces, setRecognizedFaces] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tooFar, setTooFar] = useState(false);

  const onFaceDetected = ({faces}) => {
    if (faces) {
      setRecognizedFaces(faces);
    } else {
      setRecognizedFaces([]);
    }
  };

  const takePicture = async camera => {
    const options = {quality: 0.5};
    setLoading(true);
    try {
      const data = await camera.takePictureAsync(options);
      if (data) {
        setPreviewImage(data.uri);
        setLoading(false);
        await getLocation();
      }
    } catch (errorCapture) {
      console.warn(errorCapture);
    }
  };

  const getLocation = async () => {
    await RNLocation.configure({
      distanceFilter: 1.0,
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
      },
    });

    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    }).then(granted => {
      if (granted) {
        RNLocation.subscribeToLocationUpdates(locations => {
          // replace this to test location
          const lat = 10.729239078509787;
          const lng = 106.6965148240102;
          locations.forEach(location => {
            if (
              getDistanceFromLatLonInKm(
                lat,
                lng,
                location.latitude,
                location.longitude,
              ) >= 10
            ) {
              setTooFar(true);
            } else {
              setTooFar(false);
            }
          });
        });
      }
    });
  };

  const renderFaceBounds = () => {
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
                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.snapButton}>
                  {loading ? (
                    <LottieView
                      source={GenericLoading}
                      autoPlay
                      loop
                      style={styles.lottieView}
                    />
                  ) : (
                    <Text style={styles.snapText}>Snap</Text>
                  )}
                </TouchableOpacity>
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

export default FrontFaceCamera;
