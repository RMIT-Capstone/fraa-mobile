import { combineReducers } from 'redux';

import userReducer from './UserReducer';
import attendanceSessionsReducer from './AttendanceSessionsReducer';
import toastReducer from './ToastReducer';

export default combineReducers({
  user: userReducer,
  attendanceSessions: attendanceSessionsReducer,
  toast: toastReducer,
});
