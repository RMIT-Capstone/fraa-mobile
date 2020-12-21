import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { getAttendanceSessionsState, setHomeScreenSessions } from '../../../redux/reducers/AttendanceSessionsReducer';
import Home from './Home';
import { getUserState } from '../../../redux/reducers/UserReducer';

const HomeWrapper = ({ user: { email }, attendanceSessions: { homeScreenSessions }, handleSetHomeSessions }) => {
  const navigation = useNavigation();
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [displaySession, setDisplaySession] = useState({});
  const [isHappening, setIsHappening] = useState(false);
  const [timeDifference, setTimeDifference] = useState({ hours: '', minutes: '' });

  const loadDisplaySession = () => {
    const rightNow = new Date();

    const filteredSessions = homeScreenSessions.filter((session) => {
      const { expireOn } = session;
      return new Date(expireOn) > rightNow;
    });
    if (filteredSessions.length !== homeScreenSessions.length) {
      handleSetHomeSessions(filteredSessions);
    }

    const { validOn, expireOn } = displaySession;
    setIsHappening(rightNow > new Date(validOn) && rightNow < new Date(expireOn));

    const timeDifferenceLoad = new Date(validOn) - rightNow;
    const truncated = Math.trunc(timeDifferenceLoad / 1000);
    setTimeDifference({ hours: Math.floor(truncated / 3600), minutes: Math.floor((truncated % 3600) / 60) + 1 });
  };

  useEffect(() => {
    setIsLoadingSessions(true);
    if (homeScreenSessions.length !== 0) {
      setDisplaySession(homeScreenSessions[0]);
      loadDisplaySession();
    } else {
      setDisplaySession({});
    }
    setIsLoadingSessions(false);
  }, []);

  useEffect(() => {
    let interval = null;

    if (homeScreenSessions.length !== 0 && displaySession) {
      interval = setInterval(() => {
        loadDisplaySession();
      }, 300);
    }

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <Home
      email={email}
      isLoadingSessions={isLoadingSessions}
      timeDifference={timeDifference}
      navigation={navigation}
      isHappening={isHappening}
      homeScreenSessions={homeScreenSessions}
      displaySession={displaySession}
    />
  );
};

HomeWrapper.propTypes = {
  user: object.isRequired,
  attendanceSessions: object.isRequired,
  handleSetHomeSessions: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
  attendanceSessions: getAttendanceSessionsState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetHomeSessions: (homeSessions) => dispatch(setHomeScreenSessions(homeSessions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);
