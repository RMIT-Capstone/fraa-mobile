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
  const [verifyResult, setVerifyResult] = useState(undefined);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const onFacesDetected = ({ faces }) => {
    if (faces) {
      setRecognizedFaces(faces);
    } else {
      setRecognizedFaces([]);
    }
  };

  const path = 'user';
  const userID = 'UserID';

  const onFacesVerified = ({ result }) => {
    // console.log('face verify result:' + result);
    // eslint-disable-next-line no-param-reassign
    result = parseFloat(result);
    setVerifyResult(result);
    if (result < 0.1) {
      setVerifiedCount(verifiedCount + 1);
    }
    if (verifiedCount > 5) {
      setVerifiedCount('you passed verifying phase');
    }
  };

  const takePicture = async (camera) => {
    const options = { quality: 0.5, base64: true, path, user: userID };
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
          navigateTo(navigation, ROUTES.MAIN);
        } else {
          navigateTo(navigation, ROUTES.MAIN);
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
      onFacesVerified={onFacesVerified}
      verifyResult={verifyResult}
      path={path}
      userID={userID}
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
