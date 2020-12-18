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
import { GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE, REGISTER_ATTENDANCE } from '../../constants/ApiEndpoints';
import { setAllSessions } from '../../redux/reducers/AttendanceSessionsReducer';

const FRAACameraWrapper = ({
  route: {
    params: { fromHome, id: sessionId },
  },
  user: { id: userId, email, subscribedCourses },
  handleOpenToast,
  handleSetUserRegisteredIdentity,
  handleSetAllAttendanceSessions,
}) => {
  const navigation = useNavigation();
  const [recognizedFaces, setRecognizedFaces] = useState([]);
  const [previewUri, setPreviewUri] = useState('');
  const [verifyResult, setVerifyResult] = useState({ successes: 0, failures: 0, count: 0, message: 'Scanning...' });
  const [loading, setLoading] = useState(false);
  const path = 'User';

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
        monthRange: 3,
      };
      (async () => {
        const { data, error } = await axios.post(GET_ATTENDANCE_SESSIONS_IN_MONTH_RANGE, request);
        if (error) {
          handleOpenToast(TOAST_TYPES.ERROR, 'Error refetch attendance sessions!', TOAST_POSITIONS.BOTTOM, 2000);
        } else {
          const {
            success: { sessions, markedDates },
          } = data;
          const dateSessions = sessions.filter((session) => {
            const { validOn } = session;
            const eventDate = validOn.split('T')[0];
            return eventDate === new Date().toISOString().split('T')[0];
          });
          handleSetAllAttendanceSessions(sessions, sessions, dateSessions, markedDates);
        }
      })();
    } catch (errorRefetchAttendanceSessions) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error refetch attendance sessions!', TOAST_POSITIONS.BOTTOM, 2000);
    }
  };

  const onFacesVerified = async ({ result: faceResult }) => {
    const { count, successes, failures } = verifyResult;
    setVerifyResult((prevState) => ({ ...prevState, count: count + 1 }));
    const parsedResult = parseFloat(faceResult);
    if (parsedResult < 0.1) {
      setVerifyResult((prevState) => ({ ...prevState, successes: successes + 1 }));
    } else {
      setVerifyResult((prevState) => ({ ...prevState, failures: failures + 1 }));
    }

    if (count === 40) {
      handleOpenToast(TOAST_TYPES.INFO, `${successes} / ${failures} / ${count}`, TOAST_POSITIONS.BOTTOM, 10000);
      console.table({
        successes,
        failures,
        count,
      });

      setVerifyResult((prevState) => ({ ...prevState, count: 0 }));
    }

    // if (count > 5) {
    //   setVerifyResult((prevState) => ({ ...prevState, message: 'Verified!' }));
    //   try {
    //     const { data } = await axios.post(REGISTER_ATTENDANCE, {
    //       email,
    //       sessionId,
    //     });
    //     if (data) {
    //       await refetchAttendanceSessions();
    //       setTimeout(() => {
    //         navigateTo(navigation, ROUTES.MAIN);
    //       }, 1000);
    //     }
    //   } catch (errorRegisterAttendance) {
    //     handleOpenToast(TOAST_TYPES.ERROR, 'Error register attendance!', TOAST_POSITIONS.BOTTOM, 1500);
    //   }
    // }
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
  handleSetAllAttendanceSessions: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetAllAttendanceSessions: (session, homeSessions, agendaSessions, markedDates) =>
    dispatch(setAllSessions(session, homeSessions, agendaSessions, markedDates)),
  handleSetUserRegisteredIdentity: (registered) => dispatch(setRegisteredIdentity(registered)),
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FRAACameraWrapper);
