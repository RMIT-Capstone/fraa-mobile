import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { object, func } from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { getAttendanceSessionsState, setHomeScreenSessions } from '../../../redux/reducers/AttendanceSessionsReducer';
import Home from './Home';

const HomeWrapper = ({ attendanceSessions: { homeScreenSessions }, handleSetHomeSessions }) => {
  const navigation = useNavigation();
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [displaySession, setDisplaySession] = useState({});
  const [isHappening, setIsHappening] = useState(false);
  const [timeDifference, setTimeDifference] = useState({ hours: '', minutes: '' });

  const loadDisplaySession = () => {
    const rightNow = new Date();
    const { validOn, expireOn } = displaySession;
    setIsHappening(rightNow > new Date(validOn) && rightNow < new Date(expireOn));

    const timeDifferenceLoad = new Date(validOn) - rightNow;
    const truncated = Math.trunc(timeDifferenceLoad / 1000);
    setTimeDifference({ hours: Math.floor(truncated / 3600), minutes: Math.floor((truncated % 3600) / 60) + 1 });
  };

  const removeOldSessions = () => {
    const rightNow = new Date();
    homeScreenSessions.forEach((session) => {
      const { expireOn } = session;
      if (rightNow > new Date(expireOn)) {
        const array = homeScreenSessions.slice(1);
        handleSetHomeSessions(array);
        setDisplaySession(array[0]);
      }
    });
  };

  useEffect(() => {
    if (homeScreenSessions.length !== 0) {
      setDisplaySession(homeScreenSessions[0]);
      removeOldSessions();
      loadDisplaySession();
    } else {
      setDisplaySession({});
    }

    setIsLoadingSessions(false);
  }, []);

  useEffect(() => {
    let interval = null;
    removeOldSessions();

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
  attendanceSessions: object.isRequired,
  handleSetHomeSessions: func.isRequired,
};

const mapStateToProps = (state) => ({
  attendanceSessions: getAttendanceSessionsState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetHomeSessions: (homeSessions) => dispatch(setHomeScreenSessions(homeSessions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeWrapper);
