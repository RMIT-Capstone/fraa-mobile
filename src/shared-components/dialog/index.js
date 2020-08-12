// @flow
import React from 'react';
import {object} from 'prop-types';
import {connect} from 'react-redux';
import DIALOG from './constants';
import DefaultDialog from './default-dialog/DefaultDialog';
import CheckInDialog from './check-in-dialog/CheckInDialog';
import {getDialogState} from '../../config/redux/reducers/DialogReducer';

const Dialogs = {
  [DIALOG.DEFAULT]: DefaultDialog,
  [DIALOG.CHECKIN]: CheckInDialog,
};

const FraaDialog = ({dialog: {type, ...rest}}) => {
  let Dialog = DefaultDialog;
  if (type) {
    Dialog = Dialogs[type];
  }

  return <Dialog {...rest} />;
};

FraaDialog.propTypes = {
  dialog: object.isRequired,
};

const mapStateToProps = state => ({
  dialog: getDialogState(state),
});

export default connect(
  mapStateToProps,
  null,
)(FraaDialog);
