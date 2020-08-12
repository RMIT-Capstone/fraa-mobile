import React, {useState} from 'react';
import FrontFaceCamera from './FrontFaceCamera';
import RNLocation from 'react-native-location';
import {getDistanceFromLatLngInMeters} from '../../../helpers/utils';

const FrontFaceCameraWrapper = () => {
  const [recognizedFaces, setRecognizedFaces] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);

  const onFacesDetected = ({faces}) => {
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
              getDistanceFromLatLngInMeters(
                lat,
                lng,
                location.latitude,
                location.longitude,
              ) >= 10
            ) {
              console.log('more than 10m');
            } else {
              console.log('less than 10m');
            }
          });
        });
      }
    });
  };

  const recapture = () => {
    setPreviewImage(null);
  };

  return (
    <FrontFaceCamera
      recognizedFaces={recognizedFaces}
      previewImage={previewImage}
      loading={loading}
      takePicture={takePicture}
      recapture={recapture}
      onFacesDetected={onFacesDetected}
    />
  );
};

export default FrontFaceCameraWrapper;
