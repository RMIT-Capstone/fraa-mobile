import React from 'react';
import {object} from 'prop-types';
import Profile from './Profile';

const ProfileWrapper = ({navigation}) => {
  const items = [
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

  return <Profile items={items} colors={colors} navigation={navigation} />;
};

ProfileWrapper.propTypes = {
  navigation: object.isRequired,
};

export default ProfileWrapper;
