import React, {useState} from 'react';
import {func} from 'prop-types';
import {connect} from 'react-redux';
import RegisterIdentity from './RegisterIdentity';
import RNLocation from 'react-native-location';
import {openDialog} from '../../../../config/redux/reducers/DialogReducer';

const RegisterIdentityWrapper = ({handleOpenDialog}) => {
  const [recognizedFaces, setRecognizedFaces] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);

  const onFacesDetected = ({faces}) => {
    if (faces) {
      setRecognizedFaces(faces);
    } else {
      setRecognizedFaces([]);
    }
  };

  const getLocation = async () => {
    await RNLocation.configure({
      distanceFilter: 1,
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
      },
      showsBackgroundLocationIndicator: true,
    });

    let granted = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {detail: 'fine'},
    });

    if (granted) {
      RNLocation.subscribeToLocationUpdates(locations => {
        locations.forEach(location => {
          setUserLocation(location);
        });
      });
    }
  };

  const takePicture = async camera => {
    const options = {quality: 0.5};
    setLoading(true);
    try {
      const data = await camera.takePictureAsync(options);
      await getLocation();
      if (data) {
        setPreviewImage(data.uri);
        setLoading(false);
      }
    } catch (errorCapture) {
      console.warn(errorCapture);
    }
  };

  const recapture = () => {
    setPreviewImage('');
  };

  return (
    <RegisterIdentity
      previewImage={previewImage}
      loading={loading}
      onFacesDetected={onFacesDetected}
      takePicture={takePicture}
      recognizedFaces={recognizedFaces}
      recapture={recapture}
    />
  );
};

RegisterIdentityWrapper.propTypes = {
  handleOpenDialog: func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleOpenDialog: (type, options) => dispatch(openDialog(type, options)),
});

export default connect(
  null,
  mapDispatchToProps,
)(RegisterIdentityWrapper);
