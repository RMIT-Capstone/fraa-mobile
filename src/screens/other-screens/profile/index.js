import React, { useState } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { getUserState, setUser, setUserStats, setUserCourses } from '../../../redux/reducers/UserReducer';
import { navigateTo } from '../../../helpers/navigation';
import Profile from './Profile';
import ROUTES from '../../../navigation/routes';
import {
  ATTENDANCE_STATS_NO_GROUPING,
  CURRENT_SEMESTER,
  GET_USER_API,
  GET_COURSES_BY_CODES,
} from '../../../constants/ApiEndpoints';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../../redux/reducers/ToastReducer';

const ProfileWrapper = ({ user, handleSetUser, handleSetUserStats, handleSetUserCourses, handleOpenToast }) => {
  const navigation = useNavigation();
  const colors = [{ backgroundColor: '#7ae1aa' }, { backgroundColor: '#fc9147' }, { backgroundColor: '#fac800' }];
  const { subscribedCourses, coursesInfo, email } = user;
  const [showSettings, setShowSettings] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getSubscribedCourses = async () => {
    try {
      const {
        data,
        data: { error },
      } = await axios.post(GET_COURSES_BY_CODES, { courses: subscribedCourses });
      if (data && data.success) {
        const {
          success: { courses },
        } = data;
        handleSetUserCourses(courses);
      }
      if (error) {
        handleOpenToast(TOAST_TYPES.ERROR, 'Error get courses!', TOAST_POSITIONS.BOTTOM, 1500);
      }
    } catch (errorGetSubscribedCourses) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error get courses!', TOAST_POSITIONS.BOTTOM, 1500);
    }
  };

  const getUserInfo = async () => {
    const { data, error } = await axios.post(GET_USER_API, { email });
    if (data && data.success) {
      const {
        success: { user: axiosUser },
      } = data;
      handleSetUser(axiosUser);
    }
    if (error) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error refetch user!', TOAST_POSITIONS.BOTTOM, 1500);
    }
  };

  const getUserStats = async () => {
    const request = {
      email,
      courses: subscribedCourses,
      semester: CURRENT_SEMESTER,
    };
    const { data: data1, error: error1 } = await axios.post(ATTENDANCE_STATS_NO_GROUPING, request);
    if (data1 && data1.success) {
      const { success } = data1;
      handleSetUserStats(success);
    }
    if (error1) {
      handleOpenToast(TOAST_TYPES.ERROR, 'Error fetch user stats!', TOAST_POSITIONS.BOTTOM, 1500);
    }
  };

  const refetchUser = async () => {
    setRefreshing(true);
    await Promise.all([getSubscribedCourses(), getUserInfo(), getUserStats()]);
    setRefreshing(false);
  };

  const onVerify = () => {
    navigateTo(navigation, ROUTES.CAMERA, { fromHome: true });
  };

  return (
    <Profile
      navigation={navigation}
      user={user}
      coursesInfo={coursesInfo}
      refreshing={refreshing}
      colors={colors}
      onVerify={onVerify}
      refetchUser={refetchUser}
      showSettings={showSettings}
      setShowSettings={setShowSettings}
    />
  );
};

ProfileWrapper.propTypes = {
  user: object.isRequired,
  handleSetUser: func.isRequired,
  handleSetUserStats: func.isRequired,
  handleSetUserCourses: func.isRequired,
  handleOpenToast: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetUser: (user) => dispatch(setUser(user)),
  handleSetUserStats: (stats) => dispatch(setUserStats(stats)),
  handleSetUserCourses: (courses) => dispatch(setUserCourses(courses)),
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper);
