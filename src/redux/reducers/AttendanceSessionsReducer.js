import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// INITIAL STATE
const initialState = {
  sessions: [],
  homeScreenSessions: [],
  displaySession: {},
};

// ACTION CREATORS
export const { setAllSessions, setSessions, setHomeScreenSessions, setDisplaySession } = createActions({
  SET_ALL_SESSIONS: (sessions, homeScreenSessions, displaySession) => ({
    sessions,
    homeScreenSessions,
    displaySession,
  }),
  SET_SESSIONS: (sessions) => ({ sessions }),
  SET_HOME_SCREEN_SESSIONS: (homeScreenSessions) => ({ homeScreenSessions }),
  SET_DISPLAY_SESSION: (displaySession) => ({ displaySession }),
});

// ACTION HANDLERS
export default handleActions(
  {
    SET_ALL_SESSIONS: (state, { payload: { sessions, homeScreenSessions, displaySession } }) => ({
      ...state,
      sessions,
      homeScreenSessions,
      displaySession,
    }),
    SET_SESSIONS: (state, { payload: { sessions } }) => ({
      ...state,
      sessions,
    }),
    SET_HOME_SCREEN_SESSIONS: (state, { payload: { homeScreenSessions } }) => ({
      ...state,
      homeScreenSessions,
    }),
    SET_DISPLAY_SESSION: (state, { payload: { displaySession } }) => ({
      ...state,
      displaySession,
    }),
  },
  initialState,
);

const selectorAttendanceSessions = (state) => state.attendanceSessions;

export const getAttendanceSessionsState = createSelector(
  [selectorAttendanceSessions],
  (attendanceSessions) => attendanceSessions,
);
