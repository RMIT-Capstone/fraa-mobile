import React from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getUserState, setRegisteredIdentity } from '../../../redux/reducers/UserReducer';
import { navigateTo } from '../../../helpers/navigation';
import Profile from './Profile';
import ROUTES from '../../../navigation/routes';

const ProfileWrapper = ({ user, handleSetRegisteredIdentity }) => {
  const navigation = useNavigation();
  const colors = [{ backgroundColor: '#7ae1aa' }, { backgroundColor: '#fc9147' }, { backgroundColor: '#fac800' }];

  const onVerify = () => {
    navigateTo(navigation, ROUTES.CAMERA, { fromHome: false });
  };

  const reset = () => {
    handleSetRegisteredIdentity(false);
  };

  return <Profile user={user} colors={colors} onVerify={onVerify} reset={reset} />;
};

ProfileWrapper.propTypes = {
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
