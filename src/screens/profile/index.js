import React from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserState, setRegisteredIdentity } from '../../redux/reducers/UserReducer';
import { navigateTo } from '../../helpers/navigation';
import ROUTES from '../../navigation/routes';

const ProfileWrapper = ({ navigation, user, handleSetRegisteredIdentity }) => {
  const colors = [{ backgroundColor: '#7ae1aa' }, { backgroundColor: '#fc9147' }, { backgroundColor: '#fac800' }];

  const onVerify = () => {
    navigateTo(navigation, ROUTES.CAMERA, { fromDashboard: false });
  };

  const reset = () => {
    handleSetRegisteredIdentity(false);
  };

  return <Profile user={user} colors={colors} onVerify={onVerify} reset={reset} />;
};

ProfileWrapper.propTypes = {
  navigation: object.isRequired,
  user: object.isRequired,
  handleSetRegisteredIdentity: func.isRequired,
};

const mapStateToProps = (state) => ({
  user: getUserState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSetRegisteredIdentity: (registered) => dispatch(setRegisteredIdentity(registered)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWrapper);
