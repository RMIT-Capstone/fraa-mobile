import {combineReducers} from 'redux';

import toastReducer from './ToastReducer';
import dialogReducer from './DialogReducer';

export default combineReducers({
  toast: toastReducer,
  dialog: dialogReducer,
});
