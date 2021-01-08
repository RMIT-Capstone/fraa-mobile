import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// INITIAL STATE
const initialState = {};

// ACTION CREATORS
export const { setUser, setRegisteredIdentity, setUserStats, setUserCourses, resetUser } = createActions({
  SET_USER: (user) => ({ user }),
  SET_REGISTERED_IDENTITY: (registered) => ({ registered }),
  SET_USER_STATS: ({ missed, total }) => ({ missed, total }),
  SET_USER_COURSES: (courses) => ({ courses }),
  RESET_USER: undefined,
});

// ACTION HANDLERS
export default handleActions(
  {
    SET_USER: (
      state,
      {
        payload: {
          user: {
            id,
            email,
            displayName,
            school,
            isLecturer,
            totalAttendedEventsCount,
            subscribedCourses,
            firstTimePassword,
            createdAt,
          },
        },
      },
    ) => ({
      ...state,
      id,
      email,
      displayName,
      school,
      isLecturer,
      totalAttendedSessions: totalAttendedEventsCount,
      subscribedCourses,
      firstTimePassword,
      createdAt,
    }),
    SET_REGISTERED_IDENTITY: (state, { payload: { registered } }) => ({
      ...state,
      registeredIdentity: registered,
    }),
    SET_USER_STATS: (state, { payload: { missed, total } }) => ({
      ...state,
      missedSessions: missed,
      totalSessions: total,
    }),
    SET_USER_COURSES: (state, { payload: { courses } }) => ({
      ...state,
      coursesInfo: courses,
    }),
    RESET_USER: () => initialState,
  },
  initialState,
);

const selectorUser = (state) => state.user;

export const getUserState = createSelector([selectorUser], (user) => user);
