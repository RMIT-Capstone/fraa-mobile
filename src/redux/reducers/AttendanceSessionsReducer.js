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
export const { setAttendanceSessions, setShowSessions, setAgendaSessions, setMarkedDates } = createActions({
  SET_ATTENDANCE_SESSIONS: (sessions) => ({ sessions }),
  SET_SHOW_SESSIONS: (showSessions) => ({ showSessions }),
  SET_AGENDA_SESSIONS: (agendaSessions) => ({ agendaSessions }),
  SET_MARKED_DATES: (markedDates) => ({ markedDates }),
});

// ACTION HANDLERS
export default handleActions(
  {
    SET_ATTENDANCE_SESSIONS: (state, { payload: { sessions } }) => ({
      ...state,
      sessions,
    }),
    SET_SHOW_SESSIONS: (state, { payload: { showSessions } }) => ({
      ...state,
      showSessions,
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
