import React from 'react';
import {object} from 'prop-types';
import {connect} from 'react-redux';
import DefaultDialog from './DefaultDialog';
import DIALOG from './constants';
import {getDialogState} from '../../config/redux/reducers/DialogReducer';

const Dialogs = {
  [DIALOG.DEFAULT]: DefaultDialog,
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
