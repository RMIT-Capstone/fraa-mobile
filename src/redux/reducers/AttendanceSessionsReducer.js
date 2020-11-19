import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// INITIAL STATE
const initialState = {
  sessions: [],
  agendaSessions: [],
  showSessions: [],
  markedDates: {},
};

// ACTION CREATORS
export const { setAllSessions, setSessions, setHomeScreenSessions, setAgendaSessions, setMarkedDates } = createActions({
  SET_ALL_SESSIONS: (sessions, homeScreenSessions, agendaSessions, markedDates) => ({
    sessions,
    homeScreenSessions,
    agendaSessions,
    markedDates,
  }),
  SET_SESSIONS: (sessions) => ({ sessions }),
  SET_HOME_SCREEN_SESSIONS: (homeScreenSessions) => ({ homeScreenSessions }),
  SET_AGENDA_SESSIONS: (agendaSessions) => ({ agendaSessions }),
  SET_MARKED_DATES: (markedDates) => ({ markedDates }),
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
    SET_AGENDA_SESSIONS: (state, { payload: { agendaSessions } }) => ({
      ...state,
      agendaSessions,
    }),
    SET_MARKED_DATES: (state, { payload: { markedDates } }) => ({
      ...state,
      markedDates,
    }),
  },
  initialState,
);

const selectorAttendanceSessions = (state) => state.attendanceSessions;

export const getAttendanceSessionsState = createSelector(
  [selectorAttendanceSessions],
  (attendanceSessions) => attendanceSessions,
);
