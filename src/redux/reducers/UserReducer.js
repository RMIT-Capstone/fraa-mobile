import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// INITIAL STATE
const initialState = {
  email: '',
  oneTimePassword: false,
  registeredIdentity: false,
  createdAt: '',
};

// ACTION CREATORS
export const { setUser, setRegisteredIdentity } = createActions({
  SET_USER: (user) => ({ user }),
  SET_REGISTERED_IDENTITY: (registered) => ({ registered }),
});

// ACTION HANDLERS
export default handleActions(
  {
    SET_USER: (state, { payload: { user } }) => ({
      ...state,
      user,
    }),
    SET_REGISTERED_IDENTITY: (state, { payload: { registered } }) => ({
      ...state,
      registeredIdentity: registered,
    }),
  },
  initialState,
);

const selectorUser = (state) => state.user;

export const getUserState = createSelector([selectorUser], (user) => user);
