import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// INITIAL STATE
const initialState = {
  sessions: [],
  markedDates: {},
};

// ACTION CREATORS
export const { setAttendanceSessions } = createActions({
  SET_ATTENDANCE_SESSIONS: (sessions, markedDates) => ({ sessions, markedDates }),
});

// ACTION HANDLERS
export default handleActions(
  {
    SET_ATTENDANCE_SESSIONS: (state, { payload: { sessions, markedDates } }) => ({
      ...state,
      sessions,
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
