import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { getUserState, setRegisteredIdentity } from '../../redux/reducers/UserReducer';
import ROUTES from '../../navigation/routes';
import { navigateTo } from '../../helpers/navigation';
import FRAACamera from './FRAACamera';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../redux/reducers/ToastReducer';
import {
  GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE,
  REGISTER_ATTENDANCE,
  REGISTER_IDENTITY_API,
  VERIFY_IDENTITY_API,
} from '../../constants/ApiEndpoints';
import { setAllSessions } from '../../redux/reducers/AttendanceSessionsReducer';

const FRAACameraWrapper = ({
  route: {
    params: { fromHome, id: sessionId },
  },
  user: { id: userId, email, subscribedCourses },
  handleOpenToast,
  handleSetUserRegisteredIdentity,
  handleSetAllSessions,
}) => {
  const navigation = useNavigation();
  const [recognizedFaces, setRecognizedFaces] = useState([]);
  const [previewUri, setPreviewUri] = useState('');
  const [base64Image, setBase64Image] = useState('');
  const [cameraMessage, setCameraMessage] = useState('Place your face in the camera');
  const [loading, setLoading] = useState(false);
  const path = 'User';

  useEffect(() => {
    if (recognizedFaces.length > 1) {
      setCameraMessage('There are too many faces!');
    } else {
      setCameraMessage('Place your face in the camera');
    }
  }, [recognizedFaces]);

  const onFacesDetected = ({ faces }) => {
    if (faces) {
      setRecognizedFaces(faces);
    } else {
      setRecognizedFaces([]);
    }
  };

  const refetchAttendanceSessions = async () => {
    try {
      const today = new Date();
      const request = {
        courses: subscribedCourses,
        startMonth: today.getMonth(),
        startYear: today.getFullYear(),
        endYear: today.getFullYear(),
        monthRange: 3,
      };
      (async () => {
        const {
          data,
          data: { error: fetchAttendanceSessionsError },
        } = await axios.post(GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE, request);
        if (data && data.success) {
          const {
            success: { sessions },
          } = data;
          const filterSessions = sessions.filter((session) => {
            const { expireOn } = session;
            const rightNow = new Date();
            return new Date(expireOn) > rightNow;
          });
          if (filterSessions.length !== 0) {
            handleSetAllSessions(sessions, filterSessions, filterSessions[0]);
          } else {
            handleSetAllSessions(sessions, filterSessions, {});
          }
        }
        if (fetchAttendanceSessionsError) {
          handleOpenToast(TOAST_TYPES.ERROR, 'Error refetch attendance sessions!', TOAST_POSITIONS.BOTTOM, 2000);
        }
      })();
    } catch (errorRefetchAttendanceSessions) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error refetch attendance sessions!', TOAST_POSITIONS.BOTTOM, 2000);
    }
  };

  const takePicture = async (camera) => {
    const options = { quality: 0.5, base64: true, path, user: userId };
    setLoading(true);
    try {
      const data = await camera.takePictureAsync(options);
      if (data) {
        const { uri, base64 } = data;
        setLoading(false);
        setPreviewUri(uri);
        setBase64Image(base64);
        setCameraMessage('Register or cancel');
      }
    } catch (errorCapture) {
      setLoading(false);
      handleOpenToast(TOAST_TYPES.ERROR, 'Error capture!', TOAST_POSITIONS.BOTTOM, 2000);
    }
  };

  const recapture = () => {
    setCameraMessage('Place your face in the camera');
    setPreviewUri('');
    setBase64Image('');
  };

  const registerOrVerifyIdentity = async () => {
    try {
      setLoading(true);
      if (base64Image) {
        const data = new FormData();
        const url = fromHome ? `${REGISTER_IDENTITY_API}/${userId}` : `${VERIFY_IDENTITY_API}/${userId}`;
        data.append('image', base64Image);
        const config = {
          method: 'POST',
          url,
          data,
        };
        if (fromHome) {
          setCameraMessage('Registering...');
          const response = await axios(config);
          const {
            data: { msg },
          } = response;
          if (msg) {
            handleSetUserRegisteredIdentity(true);
            navigateTo(navigation, ROUTES.MAIN);
            handleOpenToast(TOAST_TYPES.SUCCESS, 'Identity verified!', TOAST_POSITIONS.BOTTOM, 1500);
          }
        } else {
          setCameraMessage('Verifying...');
          const response = await axios(config);
          const {
            data: { msg },
          } = response;
          if (msg) {
            const { data: registerData } = await axios.post(REGISTER_ATTENDANCE, {
              email,
              sessionId,
            });
            if (registerData) {
              await refetchAttendanceSessions();
              setCameraMessage('Checked in!');
              setTimeout(() => {
                navigateTo(navigation, ROUTES.MAIN);
              }, 1500);
            }
          } else {
            setCameraMessage('Try again!');
            setTimeout(() => {
              navigateTo(navigation, ROUTES.MAIN);
            }, 1500);
          }
        }
      } else {
        handleOpenToast(TOAST_TYPES.ERROR, 'No image captured', TOAST_POSITIONS.BOTTOM, 1500);
      }
      setLoading(false);
    } catch (errorRegisterIdentityToCloud) {
      setLoading(false);
      handleOpenToast(TOAST_TYPES.ERROR, 'Error register identity!', TOAST_POSITIONS.BOTTOM, 1500);
    }
  };

  return (
    <FRAACamera
      previewUri={previewUri}
      loading={loading}
      onFacesDetected={onFacesDetected}
      cameraMessage={cameraMessage}
      takePicture={takePicture}
      recapture={recapture}
      registerIdentity={registerOrVerifyIdentity}
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
  handleSetAllSessions: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAllSessions: (sessions, homeSessions, displaySession) =>
    dispatch(setAllSessions(sessions, homeSessions, displaySession)),
  handleSetUserRegisteredIdentity: (registered) => dispatch(setRegisteredIdentity(registered)),
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FRAACameraWrapper);
