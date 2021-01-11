import React, { useState, useEffect } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import ROUTES from '../../navigation/routes';
import { getUserState } from '../../redux/reducers/UserReducer';
import { getAsyncStringData } from '../../helpers/async-storage';
import { resetRoute } from '../../helpers/navigation';
import { openToast, TOAST_POSITIONS, TOAST_TYPES } from '../../redux/reducers/ToastReducer';
import MainScreen from './MainScreen';

const MainScreenWrapper = ({ navigation, user, handleOpenToast }) => {
  const [currentTab, setCurrentTab] = useState(ROUTES.HOME);

  useEffect(() => {
    (async () => {
      const value = await getAsyncStringData('fbToken');
      if (!value || user === {} || !user) {
        handleOpenToast(TOAST_TYPES.INFO, 'Logged out', TOAST_POSITIONS.BOTTOM, 1000);
        resetRoute(navigation, ROUTES.LOGIN);
      }
    })();
  }, [user]);

  return <MainScreen currentTab={currentTab} setCurrentTab={setCurrentTab} />;
};

MainScreenWrapper.propTypes = {
  navigation: object.isRequired,
  user: object.isRequired,
  handleOpenToast: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleOpenToast: (type, content, position, duration) => dispatch(openToast(type, content, position, duration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreenWrapper);
