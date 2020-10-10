import React from 'react';
import { arrayOf, object, string } from 'prop-types';
import FRAAAgenda from './FRAAAgenda';

const FRAAAgendaWrapper = ({ agendaSessions, selectedDate }) => {
  return <FRAAAgenda agendaSessions={agendaSessions} selectedDate={selectedDate} />;
};

FRAAAgendaWrapper.propTypes = {
  agendaSessions: arrayOf(object).isRequired,
  selectedDate: string.isRequired,
};

export default FRAAAgendaWrapper;
