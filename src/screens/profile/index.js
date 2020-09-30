import React, {useState, useEffect} from 'react';
import {object, func} from 'prop-types';
import {connect} from 'react-redux';
// import axios from 'axios';
import Profile from './Profile';
import {getUserState, setUserRegisteredIdentity} from '../../redux/reducers/UserReducer';
import {navigateTo} from '../../helpers/navigation';
import ROUTES from '../../navigation/routes';

const ProfileWrapper = ({navigation, user, handleSetUserRegisteredIdentity}) => {
  const [isRegistered, setIsRegistered] = useState(false);

  // useEffect(() => {
  //   try {
  //     (async function fetchRegisterStatus() {
  //       const {
  //         data: {msg},
  //       } = await axios.get('http://159.89.205.12/check-register/trungduong0103@gmail.com');
  //       setIsRegistered(msg);
  //     })();
  //   } catch (errorFetchRegisterStatus) {
  //     console.warn(errorFetchRegisterStatus);
  //   }
  // }, []);

  useEffect(() => {
    setIsRegistered(user.registeredIdentity);
  }, [user]);

  const COURSES = [
    {
      name: 'Engineering Computing 1',
      title: 'OENG1183',
      percentage: '95%',
    },
    {
      name: 'Project Capstone - Part A',
      title: 'COSC2634',
      percentage: '60%',
    },
    {
      name: 'Programming 1',
      title: 'COSC2081',
      percentage: '75%',
    },
  ];

  const colors = [{backgroundColor: '#7ae1aa'}, {backgroundColor: '#fc9147'}, {backgroundColor: '#fac800'}];

  const onVerify = (verified) => {
    if (verified) {
      handleSetUserRegisteredIdentity(false);
    } else {
      navigateTo(navigation, ROUTES.IDENTITY_CAMERA, {fromDashboard: false});
    }
  };

  return <Profile isRegistered={isRegistered} courses={COURSES} colors={colors} onVerify={onVerify} />;
};

ProfileWrapper.propTypes = {
  navigation: object,
  user: object.isRequired,
  handleSetUserRegisteredIdentity: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetUserRegisteredIdentity: (registered) => dispatch(setUserRegisteredIdentity(registered)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper);
