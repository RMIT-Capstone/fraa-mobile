import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// TYPES
export const TOAST_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
};

// INITIAL STATE
const initialState = {
  open: false,
  type: TOAST_TYPES.INFO,
  content: '',
  duration: 1500,
};

// ACTION CREATORS
export const { openToast, closeToast } = createActions({
  OPEN_TOAST: (type, content, duration) => ({ type, content, duration }),
  CLOSE_TOAST: undefined,
});

// REDUCERS
export default handleActions(
  {
    OPEN_TOAST: (state, { payload: { type, content, duration } }) => ({
      ...state,
      open: true,
      type,
      content,
      duration,
    }),
    CLOSE_TOAST: () => ({ ...initialState }),
  },
  initialState,
);

// SELECTORS
const selectorToast = (state) => state.toast;

export const getToastState = createSelector([selectorToast], (toast) => toast);
