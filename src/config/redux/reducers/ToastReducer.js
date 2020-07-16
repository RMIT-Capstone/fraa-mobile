import {createActions, handleActions} from 'redux-actions';
import {createSelector} from 'reselect';

// INITIAL STATE
const initialState = {
  open: false,
  type: 'info',
  content: '',
  position: 'bottom',
};

// ACTIONS CREATORS
export const {openToast, closeToast} = createActions({
  OPEN_TOAST: (type, content, position) => ({type, content, position}),
  CLOSE_TOAST: undefined,
});

// REDUCERS
export default handleActions(
  {
    OPEN_TOAST: (state, {payload: {type, content, position}}) => ({
      ...state,
      open: true,
      type,
      content,
      position,
    }),
    CLOSE_TOAST: state => ({
      ...state,
      open: false,
      type: '',
      content: '',
      position: 'bottom',
    }),
  },
  initialState,
);

// SELECTORS
const selectorToast = state => state.toast;

export const getToastState = createSelector(
  [selectorToast],
  toast => toast,
);
