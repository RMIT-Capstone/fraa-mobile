import React from 'react';
import { object } from 'prop-types';
import Home from './Home';

const HomeWrapper = ({ navigation }) => <Home navigation={navigation} />;

HomeWrapper.propTypes = {
  navigation: object.isRequired,
};

export default HomeWrapper;
