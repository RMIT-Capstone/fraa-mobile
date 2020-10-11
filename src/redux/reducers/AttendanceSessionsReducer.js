import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// INITIAL STATE
const initialState = [];

// ACTION CREATORS
export const { setAttendanceSessions } = createActions({
  SET_ATTENDANCE_SESSIONS: undefined,
});

// ACTION HANDLERS
export default handleActions(
  {
    SET_ATTENDANCE_SESSIONS: (state, action) => [...action.payload],
  },
  initialState,
);

const selectorAttendanceSessions = (state) => state.attendanceSessions;

export const getAttendanceSessionsState = createSelector(
  [selectorAttendanceSessions],
  (attendanceSessions) => attendanceSessions,
);
