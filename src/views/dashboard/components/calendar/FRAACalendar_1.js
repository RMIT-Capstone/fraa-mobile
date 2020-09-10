import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {bool} from 'prop-types';
import {View, Button, Text, TouchableOpacity, Alert} from 'react-native';
import {CalendarProvider, AgendaList, ExpandableCalendar, WeekCalendar} from 'react-native-calendars';
import styles from './FRAACalendarStyle';
import AgendaView from 'react-native-calendars/src/agenda';

const FRAACalendar_1 = () => {
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

  const getTheme = () => {
    const disabledColor = 'grey';

    return {
      // arrows
      arrowColor: 'black',
      arrowStyle: {padding: 0},
      // month
      monthTextColor: 'black',
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: 'black',
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // dates
      dayTextColor: 'black',
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      // textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: '#fff',
      selectedDayTextColor: 'black',
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: 'blue',
      selectedDotColor: 'white',
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2},
    };
  };

  const renderEmptyDate = () => {
    return (
      <View style={[styles.agenda, styles.centered]}>
        <Text style={styles.emptyEventText}>No event for this day yet :D</Text>
      </View>
    );
  };

  const renderDay = () => {
    return (
      <TouchableOpacity onPress={() => Alert.alert('Pressed')}>
        <View style={styles.agendaItem}>
          <Text>EVENTS</Text>
          <Text>{todayObject.courseName}</Text>
          <Text>{todayObject.courseCode}</Text>
          <Text>{todayObject.validOn}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getTodayObject = day => {
    // console.log(day);

    sessions.COSC2081.forEach(session => {
      const {validOn} = session;
      const validOnString = validOn.split('T')[0];
      if (!typeof day === 'string') {
        if (day.split('T')[0] === validOnString) {
          return setTodayObject(session);
        }
      }
      if (typeof day === 'string') {
        if (day === validOnString) {
          return setTodayObject(session);
        }
      }
      return setTodayObject({});
    });
  };
  console.log(todayObject);

  return (
    <CalendarProvider
      date={new Date()}
      showTodayButton
      disabledOpacity={0.6}
      // theme={{
      //   todayButtonTextColor: themeColor
      // }}
      todayBottomMargin={10}
      onDateChanged={date => getTodayObject(date)}>
      <ExpandableCalendar
        // horizontal={false}
        // hideArrows
        // disablePan
        // hideKnob
        // initialPosition={ExpandableCalendar.positions.OPEN}
        // calendarStyle={styles.calendar}
        // headerStyle={styles.calendar} // for horizontal only
        // disableWeekScroll
        theme={getTheme()}
        onDayPress={() => console.log('Hello')}
        firstDay={1}
      />
      {renderDay()}
    </CalendarProvider>
  );
};

export default FRAACalendar_1;
