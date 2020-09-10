import React from 'react';
import {object} from 'prop-types';
import {connect} from 'react-redux';
import {getCheckInProcessState} from '../../../../config/redux/reducers/CheckInProcessReducer';
import FrontFaceCamera from './front-face-camera';
import QRCodeCamera from './qr-code-camera/QRCodeCamera';

const CheckIn = ({checkInProcess}) => {
  const {checkIn} = checkInProcess;
  if (checkIn) {
    return <FrontFaceCamera />;
  }
  return <QRCodeCamera />;
};

CheckIn.propTypes = {
  checkInProcess: object.isRequired,
};

const mapStateToProps = state => ({
  checkInProcess: getCheckInProcessState(state),
});

export default connect(
  mapStateToProps,
  null,
)(CheckIn);
