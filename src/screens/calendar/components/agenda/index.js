import React from 'react';
import { arrayOf, object } from 'prop-types';
import FRAAAgenda from './FRAAAgenda';

const FRAAAgendaWrapper = ({ agendaSessions }) => {
  return <FRAAAgenda agendaSessions={agendaSessions} />;
};

FRAAAgendaWrapper.propTypes = {
  agendaSessions: arrayOf(object).isRequired,
};

export default FRAAAgendaWrapper;
