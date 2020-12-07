import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// TYPES
export const TOAST_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const TOAST_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
};

// INITIAL STATE
const initialState = {
  open: false,
  type: TOAST_TYPES.INFO,
  content: '',
  position: TOAST_POSITIONS.BOTTOM,
  duration: 1500,
};

// ACTION CREATORS
export const { openToast, closeToast } = createActions({
  OPEN_TOAST: (type, content, position, duration) => ({ type, content, position, duration }),
  CLOSE_TOAST: undefined,
});

// REDUCERS
export default handleActions(
  {
    OPEN_TOAST: (state, { payload: { type, content, position, duration } }) => ({
      ...state,
      open: true,
      type,
      content,
      position,
      duration,
    }),
    CLOSE_TOAST: () => initialState,
  },
  initialState,
);

// SELECTORS
const selectorToast = (state) => state.toast;

export const getToastState = createSelector([selectorToast], (toast) => toast);
