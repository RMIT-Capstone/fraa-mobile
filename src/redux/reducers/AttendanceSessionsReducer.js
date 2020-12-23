import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// INITIAL STATE
const initialState = {
  sessions: [],
  homeScreenSessions: [],
};

// ACTION CREATORS
export const { setAllSessions, setSessions, setHomeScreenSessions } = createActions({
  SET_ALL_SESSIONS: (sessions, homeScreenSessions) => ({
    sessions,
    homeScreenSessions,
  }),
  SET_SESSIONS: (sessions) => ({ sessions }),
  SET_HOME_SCREEN_SESSIONS: (homeScreenSessions) => ({ homeScreenSessions }),
});

// ACTION HANDLERS
export default handleActions(
  {
    SET_ALL_SESSIONS: (state, { payload: { sessions, homeScreenSessions, agendaSessions, markedDates } }) => ({
      ...state,
      sessions,
      homeScreenSessions,
      agendaSessions,
      markedDates,
    }),
    SET_SESSIONS: (state, { payload: { sessions } }) => ({
      ...state,
      sessions,
    }),
    SET_HOME_SCREEN_SESSIONS: (state, { payload: { homeScreenSessions } }) => ({
      ...state,
      homeScreenSessions,
    }),
  },
  initialState,
);

const selectorAttendanceSessions = (state) => state.attendanceSessions;

export const getAttendanceSessionsState = createSelector(
  [selectorAttendanceSessions],
  (attendanceSessions) => attendanceSessions,
);
