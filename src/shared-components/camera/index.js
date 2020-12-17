import React, { useState } from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { getUserState, setRegisteredIdentity } from '../../redux/reducers/UserReducer';
import ROUTES from '../../navigation/routes';
import { navigateTo } from '../../helpers/navigation';
import FRAACamera from './FRAACamera';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../redux/reducers/ToastReducer';
import { REGISTER_ATTENDANCE } from '../../constants/ApiEndpoints';

const FRAACameraWrapper = ({
  route: {
    params: { fromHome, id: sessionId },
  },
  user: { id: userId, email },
  handleOpenToast,
  handleSetUserRegisteredIdentity,
}) => {
  const navigation = useNavigation();
  const [recognizedFaces, setRecognizedFaces] = useState([]);
  const [previewUri, setPreviewUri] = useState('');
  const [verifyResult, setVerifyResult] = useState({ count: 0, message: 'Scanning...' });
  const [loading, setLoading] = useState(false);
  const path = 'User';

  const onFacesDetected = ({ faces }) => {
    if (faces) {
      setRecognizedFaces(faces);
    } else {
      setRecognizedFaces([]);
    }
  };

  const onFacesVerified = async ({ result: faceResult }) => {
    const parsedResult = parseFloat(faceResult);
    const { count } = verifyResult;
    if (parsedResult < 0.1) {
      setVerifyResult((prevState) => ({ ...prevState, count: count + 1 }));
    }
    if (count > 5) {
      setVerifyResult((prevState) => ({ ...prevState, message: 'Verified!' }));
      try {
        const { data } = await axios.post(REGISTER_ATTENDANCE, {
          email,
          sessionId,
        });
        if (data) {
          setTimeout(() => {
            navigateTo(navigation, ROUTES.MAIN);
          }, 1000);
        }
      } catch (errorRegisterAttendance) {
        handleOpenToast(TOAST_TYPES.ERROR, 'Error register attendance!', TOAST_POSITIONS.BOTTOM, 1500);
      }
    }
  };

  const takePicture = async (camera) => {
    const options = { quality: 0.5, base64: true, path, user: userId };
    setLoading(true);
    try {
      const data = await camera.takePictureAsync(options);
      if (data) {
        const { uri } = data;
        setLoading(false);
        setPreviewUri(uri);
        handleSetUserRegisteredIdentity(true);
        handleOpenToast(TOAST_TYPES.SUCCESS, 'Identity verified!', TOAST_POSITIONS.BOTTOM, 2000);
        setTimeout(() => {
          navigateTo(navigation, ROUTES.MAIN);
        }, 1000);
      }
    } catch (errorCapture) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error capture!', TOAST_POSITIONS.BOTTOM, 2000);
    }
  };

  // const registerOrVerifyIdentity = async () => {
  //   setLoading(true);
  //   const base64Data = new FormData();
  //   base64Data.append('image', previewImage.base64);
  //   const url = fromHome ? `${VERIFY_IDENTITY_API}/${DEMO_EMAIL}` : `${REGISTER_IDENTITY_API}/${DEMO_EMAIL}`;
  //   const config = {
  //     method: 'POST',
  //     url,
  //     data: base64Data,
  //   };
  //   try {
  //     const { data } = await axios(config);
  //     if (data) {
  //       setLoading(false);
  //       if (fromHome) {
  //         navigateTo(navigation, ROUTES.MAIN);
  //         handleSetUserRegisteredIdentity(true);
  //       } else {
  //         navigateTo(navigation, ROUTES.MAIN);
  //       }
  //     }
  //   } catch (errorRegisterOrVerifyIdentity) {
  //     handleOpenToast(TOAST_TYPES.ERROR, 'Error register/verify identity!', TOAST_POSITIONS.BOTTOM, 2000);
  //   }
  // };

  return (
    <FRAACamera
      previewUri={previewUri}
      loading={loading}
      onFacesDetected={onFacesDetected}
      onFacesVerified={onFacesVerified}
      verifyResult={verifyResult}
      path={path}
      userID={userId}
      takePicture={takePicture}
      recognizedFaces={recognizedFaces}
      fromHome={fromHome}
    />
  );
};

FRAACameraWrapper.propTypes = {
  route: object.isRequired,
  user: object.isRequired,
  handleOpenToast: func.isRequired,
  handleSetUserRegisteredIdentity: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetUserRegisteredIdentity: (registered) => dispatch(setRegisteredIdentity(registered)),
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FRAACameraWrapper);
