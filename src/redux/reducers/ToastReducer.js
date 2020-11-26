import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

// INITIAL STATE
const initialState = {
  open: false,
  content: '',
};

// ACTION CREATORS
export const { openToast, closeToast } = createActions({
  OPEN_TOAST: (content) => ({ content }),
  CLOSE_TOAST: undefined,
});

// REDUCERS
export default handleActions(
  {
    OPEN_TOAST: (state, { payload: { content } }) => ({
      ...state,
      open: true,
      content,
    }),
    CLOSE_TOAST: () => ({ ...initialState }),
  },
  initialState,
);

// SELECTORS
const selectorToast = (state) => state.toast;

export const getToastState = createSelector([selectorToast], (toast) => toast);
