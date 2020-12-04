import React, { useState } from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { DEMO_EMAIL, REGISTER_IDENTITY_API, VERIFY_IDENTITY_API } from '../../constants/ApiEndpoints';
import { setRegisteredIdentity } from '../../redux/reducers/UserReducer';
import ROUTES from '../../navigation/routes';
import { navigateTo } from '../../helpers/navigation';
import FRAACamera from './FRAACamera';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../redux/reducers/ToastReducer';

const FRAACameraWrapper = ({
  route: {
    params: { fromHome },
  },
  handleOpenToast,
}) => {
  const navigation = useNavigation();
  const [recognizedFaces, setRecognizedFaces] = useState([]);
  const [previewImage, setPreviewImage] = useState({ base64: '', uri: '' });
  const [loading, setLoading] = useState(false);

  const onFacesDetected = ({ faces }) => {
    if (faces) {
      setRecognizedFaces(faces);
    } else {
      setRecognizedFaces([]);
    }
  };

  const takePicture = async (camera) => {
    const options = { quality: 0.5, base64: true };
    setLoading(true);
    try {
      const data = await camera.takePictureAsync(options);
      if (data) {
        const { uri, base64 } = data;
        setPreviewImage({ base64, uri });
        setLoading(false);
      }
    } catch (errorCapture) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error capture!', TOAST_POSITIONS.BOTTOM, 2000);
    }
  };

  const recapture = () => {
    setPreviewImage({ base64: '', uri: '' });
  };

  const registerOrVerifyIdentity = async () => {
    setLoading(true);
    const base64Data = new FormData();
    base64Data.append('image', previewImage.base64);
    const url = fromHome ? `${VERIFY_IDENTITY_API}/${DEMO_EMAIL}` : `${REGISTER_IDENTITY_API}/${DEMO_EMAIL}`;
    const config = {
      method: 'POST',
      url,
      data: base64Data,
    };
    try {
      const { data } = await axios(config);
      if (data) {
        setLoading(false);
        if (fromHome) {
          navigateTo(navigation, ROUTES.HOME);
        } else {
          navigateTo(navigation, ROUTES.PROFILE);
        }
      }
    } catch (errorRegisterOrVerifyIdentity) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error register/verify identity!', TOAST_POSITIONS.BOTTOM, 2000);
    }
  };

  return (
    <FRAACamera
      previewImage={previewImage}
      loading={loading}
      onFacesDetected={onFacesDetected}
      takePicture={takePicture}
      recognizedFaces={recognizedFaces}
      registerOrVerifyIdentity={registerOrVerifyIdentity}
      fromHome={fromHome}
      recapture={recapture}
    />
  );
};

FRAACameraWrapper.propTypes = {
  route: object.isRequired,
  handleOpenToast: func.isRequired,
};

export default connect(null, { handleSetUserRegisteredIdentity: setRegisteredIdentity, handleOpenToast: openToast })(
  FRAACameraWrapper,
);
