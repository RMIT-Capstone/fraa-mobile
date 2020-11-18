import React, { useState } from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import axios from 'axios';
import { navigateTo } from '../../helpers/navigation';
import { DEMO_EMAIL, REGISTER_IDENTITY_API, VERIFY_IDENTITY_API } from '../../constants/ApiEndpoints';
import ROUTES from '../../navigation/routes';
import FRAACamera from './FRAACamera';
import { setRegisteredIdentity } from '../../redux/reducers/UserReducer';

const FRAACameraWrapper = ({
  route: {
    params: { fromHome },
  },
  navigation,
}) => {
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
      console.warn(errorCapture);
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
      console.warn(errorRegisterOrVerifyIdentity);
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
  navigation: object.isRequired,
  handleSetUserRegisteredIdentity: func.isRequired,
};

export default connect(null, { handleSetUserRegisteredIdentity: setRegisteredIdentity })(FRAACameraWrapper);
