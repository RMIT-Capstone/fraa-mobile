import React, { useState } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { getUserState, setUser, setRegisteredIdentity, setUserStats } from '../../../redux/reducers/UserReducer';
import { navigateTo } from '../../../helpers/navigation';
import Profile from './Profile';
import ROUTES from '../../../navigation/routes';
import { ATTENDANCE_STATS_NO_GROUPING, CURRENT_SEMESTER, GET_USER_API } from '../../../constants/ApiEndpoints';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../../redux/reducers/ToastReducer';

const ProfileWrapper = ({ user, handleSetUser, handleSetRegisteredIdentity, handleSetUserStats, handleOpenToast }) => {
  const navigation = useNavigation();
  const colors = [{ backgroundColor: '#7ae1aa' }, { backgroundColor: '#fc9147' }, { backgroundColor: '#fac800' }];
  const [showSettings, setShowSettings] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserStats = async () => {
    try {
      const { email, subscribedCourses } = user;
      const request = {
        email,
        courses: subscribedCourses,
        semester: CURRENT_SEMESTER,
      };
      const {
        data: { success, error },
      } = await axios.post(ATTENDANCE_STATS_NO_GROUPING, request);
      if (error) {
        handleOpenToast(TOAST_TYPES.ERROR, 'Error fetch user stats!', TOAST_POSITIONS.BOTTOM, 1500);
      } else {
        handleSetUserStats(success);
      }
    } catch (errorFetchUserStats) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error fetch user stats!', TOAST_POSITIONS.BOTTOM, 1500);
    }
  };

  const refetchUser = async () => {
    try {
      const { email } = user;
      const {
        data: { success, error },
      } = await axios.post(GET_USER_API, { email });
      if (error) {
        handleOpenToast(TOAST_TYPES.ERROR, 'Error refetch user!', TOAST_POSITIONS.BOTTOM, 1500);
      } else {
        const { user: axiosUser } = success;
        handleSetUser(axiosUser);
      }
    } catch (errorRefetchUser) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error refetch user!', TOAST_POSITIONS.BOTTOM, 1500);
    }
  };

  const onVerify = () => {
    navigateTo(navigation, ROUTES.CAMERA, { fromHome: true });
  };

  const reset = () => {
    handleSetRegisteredIdentity(false);
  };

  const refetchUserProfile = () => {
    setRefreshing(true);
    Promise.all([fetchUserStats(), refetchUser()]).then(() => {
      setRefreshing(false);
    });
  };

  return (
    <Profile
      user={user}
      refreshing={refreshing}
      colors={colors}
      onVerify={onVerify}
      reset={reset}
      refetchUser={refetchUserProfile}
      showSettings={showSettings}
      setShowSettings={setShowSettings}
    />
  );
};

ProfileWrapper.propTypes = {
  user: object.isRequired,
  handleSetUser: func.isRequired,
  handleSetRegisteredIdentity: func.isRequired,
  handleSetUserStats: func.isRequired,
  handleOpenToast: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetUser: (user) => dispatch(setUser(user)),
  handleSetRegisteredIdentity: (registered) => dispatch(setRegisteredIdentity(registered)),
  handleSetUserStats: (stats) => dispatch(setUserStats(stats)),
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper);
