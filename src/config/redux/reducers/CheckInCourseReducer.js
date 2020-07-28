import {createActions, handleActions} from 'redux-actions';
import {createSelector} from 'reselect';

// INITIAL STATE
const initialState = {};

// ACTION CREATORS
export const {setCheckInCourse, clearCheckInCourse} = createActions({
  SET_CHECK_IN_COURSE: course => ({course}),
  CLEAR_CHECK_IN_COURSE: undefined,
});

// REDUCERS
export default handleActions(
  {
    SET_CHECK_IN_COURSE: (state, {payload: {course}}) => ({
      ...course,
    }),
    CLEAR_CHECK_IN_COURSE: () => ({}),
  },
  initialState,
);

// SELECTORS
const selectorCheckInCourse = state => state.checkInCourse;
export const getCheckInCourseState = createSelector(
  [selectorCheckInCourse],
  checkInCourse => checkInCourse,
);
