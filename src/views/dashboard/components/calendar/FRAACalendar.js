import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {bool} from 'prop-types';
import {View, Button, Text, TouchableOpacity, Alert} from 'react-native';
import {Agenda, AgendaList} from 'react-native-calendars';
import styles from './FRAACalendarStyle';

const FRAACalendar = () => {
  const [userDate, setUserDate] = useState(new Date().toISOString());
  const [todayObject, setTodayObject] = useState({});

  let sessions = {
    COSC2081: [
      {
        courseCode: 'COSC2081',
        courseName: 'Programming 1',
        createdAt: '2020-09-04T06:32:23.517Z',
        expireOn: '2020-09-04T06:25:15.202Z',
        id: '4ISD6g56CAPBv4OSyDuk',
        lecturer: 'Thanh Nguyen Ngoc',
        validOn: '2020-09-04T06:20:15.202Z',
      },
      {
        courseCode: 'COSC2081',
        courseName: 'Programming 1',
        createdAt: '2020-09-04T06:32:27.295Z',
        expireOn: '2020-09-05T06:25:15.202Z',
        id: 'j1fedzXkKfGAA8aHIn4K',
        lecturer: 'Thanh Nguyen Ngoc',
        validOn: '2020-09-05T06:20:15.202Z',
      },
      {
        courseCode: 'COSC2081',
        courseName: 'Programming 1',
        createdAt: '2020-09-04T06:32:32.283Z',
        expireOn: '2020-09-06T06:25:15.202Z',
        id: 'Cxv1k3DxGEDO9g4GpJHP',
        lecturer: 'Thanh Nguyen Ngoc',
        validOn: '2020-09-06T06:20:15.202Z',
      },
      {
        courseCode: 'COSC2081',
        courseName: 'Programming 1',
        createdAt: '2020-09-04T06:33:10.806Z',
        expireOn: '2020-09-07T06:25:15.202Z',
        id: 'g5zm6a51fhTYS5LQIfeg',
        lecturer: 'Thanh Nguyen Ngoc',
        validOn: '2020-09-07T06:20:15.202Z',
      },
      {
        courseCode: 'COSC2081',
        courseName: 'Programming 1',
        createdAt: '2020-09-04T14:28:13.417Z',
        expireOn: '2020-09-08T06:25:15.202Z',
        id: 'zi5qM3c9HMr3d5YcVvMr',
        lecturer: 'Thanh Nguyen Ngoc',
        validOn: '2020-09-08T06:20:15.202Z',
      },
      {
        courseCode: 'COSC2081',
        courseName: 'Programming 1',
        createdAt: '2020-09-04T14:28:43.711Z',
        expireOn: '2020-09-09T06:25:15.202Z',
        id: '7iLhk1fcJSjMN5xJYOxX',
        lecturer: 'Thanh Nguyen Ngoc',
        validOn: '2020-09-09T06:20:15.202Z',
      },
      {
        courseCode: 'COSC2081',
        courseName: 'Programming 1',
        createdAt: '2020-09-08T10:27:58.736Z',
        expireOn: '2020-09-09T06:25:15.202Z',
        id: 'FiI287AxcDZnk1MFcAD4',
        lecturer: 'Thanh Nguyen Ngoc',
        validOn: '2020-09-09T06:20:15.202Z',
      },
      {
        courseCode: 'COSC2081',
        courseName: 'programming 1',
        createdAt: '2020-09-08T10:35:22.166Z',
        expireOn: '2020-09-08T10:50:43.615Z',
        id: 'o5O7LETieARbP3dmv7v1',
        lecturer: 'Thanh Nguyen Ngoc',
        validOn: '2020-09-10T10:40:00.000Z',
      },
    ],
  };

  const renderEmptyDate = () => {
    return (
      <View style={[styles.agenda, styles.centered]}>
        <Text style={styles.emptyEventText}>No event for this day yet :D</Text>
      </View>
    );
  };

  const renderDay = day => {
    return (
      <TouchableOpacity onPress={() => Alert.alert('Pressed')}>
        <View style={styles.agendaItem}>
          <Text>EVENTS</Text>
          <Text>{day.courseName}</Text>
          <Text>{day.courseCode}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getTodayObject = day => {
    const dayString = day.dateString.split('T')[0];
    sessions.COSC2081.forEach(session => {
      const {validOn, courseName, courseCode, id} = session;
      const validOnString = validOn.split('T')[0];
      if (dayString === validOnString) {
        let object = {};
        object[validOnString] = [{courseName, courseCode, id}];
        setTodayObject(object);
      }
    });
  };

  return (
    <Agenda
      selected={new Date()}
      renderEmptyData={renderEmptyDate}
      renderItem={(day, item) => renderDay(day, item)}
      onDayPress={day => getTodayObject(day)}
      items={todayObject}
      rowHasChanged={(r1, r2) => {
        return r1.id !== r2.id;
      }}
      style={[styles.agenda]}
    />
  );
};

FRAACalendar.propTypes = {
  weekView: bool,
};

FRAACalendar.defaultProps = {
  weekView: false,
};

export default FRAACalendar;
