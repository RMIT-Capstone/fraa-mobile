import {createActions, handleActions} from 'redux-actions';
import {createSelector} from 'reselect';

// INITIAL STATE
const initialState = {
  user: {
    email: '',
    oneTimePassword: false,
    registeredIdentity: false,
    createdAt: '',
  },
};

// ACTION CREATORS
export const {setUser} = createActions({
  SET_USER: user => ({user}),
});

// ACTION HANDLERS
export default handleActions(
  {
    SET_USER: (state, {payload: {user}}) => ({
      ...state,
      user,
    }),
  },
  initialState,
);

const selectorUser = state => state.user;

export const getUserState = createSelector(
  [selectorUser],
  user => user,
);
