import React, {useState, useEffect} from 'react';
import {object} from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import Profile from './Profile';
import {getUserState} from '../../config/redux/reducers/UserReducer';

const ProfileWrapper = ({navigation, user}) => {
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

  return <Profile isRegistered={isRegistered} courses={COURSES} colors={colors} navigation={navigation} />;
};

ProfileWrapper.propTypes = {
  navigation: object.isRequired,
};

const mapStateToProps = state => ({
  user: getUserState(state),
});

export default connect(
  mapStateToProps,
  null,
)(ProfileWrapper);
