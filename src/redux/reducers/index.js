import { combineReducers } from 'redux';

import userReducer from './UserReducer';
import attendanceSessionsReducer from './AttendanceSessionsReducer';

export default combineReducers({
  user: userReducer,
  attendanceSessions: attendanceSessionsReducer,
});
