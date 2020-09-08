import {combineReducers} from 'redux';

import toastReducer from './ToastReducer';
import dialogReducer from './DialogReducer';
import checkInProcessReducer from './CheckInProcessReducer';
import userReducer from './UserReducer';

export default combineReducers({
  toast: toastReducer,
  dialog: dialogReducer,
  checkInProcess: checkInProcessReducer,
  user: userReducer,
});
