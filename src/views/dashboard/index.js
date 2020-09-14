import React from 'react';
import {object} from 'prop-types';
import Dashboard from './Dashboard';

const DashboardWrapper = ({navigation}) => {
  return <Dashboard navigation={navigation} />;
};

DashboardWrapper.propTypes = {
  navigation: object.isRequired,
};

export default DashboardWrapper;
