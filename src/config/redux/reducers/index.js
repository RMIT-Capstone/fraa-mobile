import {combineReducers} from 'redux';

import toastReducer from './ToastReducer';
import dialogReducer from './DialogReducer';
import checkInCourseReducer from './CheckInCourseReducer';

export default combineReducers({
  toast: toastReducer,
  dialog: dialogReducer,
  checkInCourse: checkInCourseReducer,
});
