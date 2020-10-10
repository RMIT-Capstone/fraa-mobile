import React, { useEffect } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
// import axios from 'axios';
import Profile from './Profile';
import { getUserState, setRegisteredIdentity } from '../../redux/reducers/UserReducer';
import { navigateTo } from '../../helpers/navigation';
import ROUTES from '../../navigation/routes';
import MOCK_COURSES from './MockCourses';
// import { CHECK_IDENTITY_API } from '../../constants/ApiEndpoints';

const ProfileWrapper = ({ navigation, user, handleSetRegisteredIdentity }) => {
  const { registeredIdentity } = user;

  useEffect(() => {
    handleSetRegisteredIdentity(false);
  }, [handleSetRegisteredIdentity]);

  // useEffect(() => {
  //   if (!registeredIdentity) {
  //     try {
  //       (async function fetchRegisterStatus() {
  //         const {
  //           data: { msg },
  //         } = await axios.get(CHECK_IDENTITY_API);
  //         handleSetRegisteredIdentity(msg);
  //       })();
  //     } catch (errorFetchRegisterStatus) {
  //       console.warn(errorFetchRegisterStatus);
  //     }
  //   }
  // }, [registeredIdentity, handleSetRegisteredIdentity]);

  const colors = [{ backgroundColor: '#7ae1aa' }, { backgroundColor: '#fc9147' }, { backgroundColor: '#fac800' }];

  const onVerify = (verified) => {
    if (verified) {
      handleSetRegisteredIdentity(true);
    } else {
      navigateTo(navigation, ROUTES.IDENTITY_CAMERA, { fromDashboard: false });
    }
  };

  return <Profile isRegistered={registeredIdentity} courses={MOCK_COURSES} colors={colors} onVerify={onVerify} />;
};

ProfileWrapper.propTypes = {
  navigation: object.isRequired,
  user: object.isRequired,
  handleSetRegisteredIdentity: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetRegisteredIdentity: (registered) => dispatch(setRegisteredIdentity(registered)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper);
