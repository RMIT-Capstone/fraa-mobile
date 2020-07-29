import {createActions, handleActions} from 'redux-actions';
import {createSelector} from 'reselect';

// INITIAL STATE
const initialState = {
  checkIn: false,
  attendanceInfo: {},
};

// ACTION CREATORS
export const {setCheckIn, clearCheckIn} = createActions({
  SET_CHECK_IN: attendanceInfo => ({attendanceInfo}),
  CLEAR_CHECK_IN: undefined,
});

// REDUCERS
export default handleActions(
  {
    SET_CHECK_IN: (state, {payload: {attendanceInfo}}) => ({
      ...state,
      checkIn: true,
      attendanceInfo,
    }),
    CLEAR_CHECK_IN: state => ({
      ...state,
      checkIn: false,
      attendanceInfo: {},
    }),
  },
  initialState,
);

// SELECTORS
const selectorCheckInProcess = state => state.checkInProcess;
export const getCheckInProcessState = createSelector(
  [selectorCheckInProcess],
  checkInProcess => checkInProcess,
);
