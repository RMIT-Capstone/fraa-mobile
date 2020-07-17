import {createActions, handleActions} from 'redux-actions';
import {createSelector} from 'reselect';
import DIALOG from '../../../shared-components/dialog/constants';

// INITIAL STATE
const initialState = {
  open: false,
  type: DIALOG.DEFAULT,
  options: {},
};

// ACTION CREATORS
export const {openDialog, closeDialog} = createActions({
  OPEN_DIALOG: (type, options) => ({type, options}),
  CLOSE_DIALOG: undefined,
});

// ACTION HANDLERS
export default handleActions(
  {
    OPEN_DIALOG: (state, {payload: {type, options}}) => ({
      ...state,
      open: true,
      type,
      options,
    }),
    CLOSE_DIALOG: state => ({
      ...state,
      open: false,
      type: DIALOG.DEFAULT,
      options: {},
    }),
  },
  initialState,
);

// SELECTORS
const selectorDialog = state => state.dialog;

export const getDialogState = createSelector(
  [selectorDialog],
  dialog => dialog,
);
