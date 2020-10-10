import React from 'react';
import { object } from 'prop-types';
import Agenda from './Agenda';

const AgendaWrapper = ({ navigation }) => {
  return <Agenda navigation={navigation} />;
};

AgendaWrapper.propTypes = {
  navigation: object.isRequired,
};

export default AgendaWrapper;
