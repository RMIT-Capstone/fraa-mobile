import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// INITIAL STATE
const initialState = {};

// ACTION CREATORS
export const { setUser, setRegisteredIdentity, resetUser } = createActions({
  SET_USER: (user) => ({ user }),
  SET_REGISTERED_IDENTITY: (registered) => ({ registered }),
  RESET_USER: undefined,
});

// ACTION HANDLERS
export default handleActions(
  {
    SET_USER: (
      state,
      {
        payload: {
          user: { id, email, displayName, school, subscribedCourses, firstTimePassword, createdAt },
        },
      },
    ) => ({
      ...state,
      id,
      email,
      displayName,
      school,
      subscribedCourses,
      firstTimePassword,
      createdAt,
    }),
    SET_REGISTERED_IDENTITY: (state, { payload: { registered } }) => ({
      ...state,
      registeredIdentity: registered,
    }),
    RESET_USER: () => initialState,
  },
  initialState,
);

const selectorUser = (state) => state.user;

export const getUserState = createSelector([selectorUser], (user) => user);
