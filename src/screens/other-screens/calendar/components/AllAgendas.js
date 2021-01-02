import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { getAttendanceSessionsState } from '../../../../redux/reducers/AttendanceSessionsReducer';

const AllAgendas = ({ attendanceSessions: { sessions } }) => {
  const [groupedSessions, setGroupedSessions] = useState([]);
  useEffect(() => {
    const groupBy = (array, key) =>
      // Return the end result
      array.reduce((result, currentValue) => {
        // If an array already present for key, push it to the array. Else create an array and push the object
        // eslint-disable-next-line no-param-reassign
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
      }, {}); // empty object is the initial value for result object

    const array = groupBy(sessions, 'validOn');

    setGroupedSessions(array);
  }, []);
  return (
    <View style={[styles.container, styles.centered]}>
      <Text>All agenda</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AllAgendas.propTypes = {
  attendanceSessions: object.isRequired,
};

const mapStateToProps = (state) => ({
  attendanceSessions: getAttendanceSessionsState(state),
});

export default connect(mapStateToProps, null)(AllAgendas);
