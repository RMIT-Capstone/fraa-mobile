import React, {useState, useEffect} from 'react';
import {func, object, bool} from 'prop-types';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import theme from '../../../theme';
import {closeDialog} from '../../../config/redux/reducers/DialogReducer';

const DefaultDialog = ({open, options, handleCloseDialog}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setDialogOpen(open);
  }, [open]);

  const onDialogClose = () => {
    handleCloseDialog();
    setDialogOpen(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={dialogOpen}>
      <View style={styles.centeredView}>
        <View style={styles.dialogWrapper}>
          <View style={styles.dialogTextWrapper}>
            <Text style={styles.toastContentText}>{JSON.stringify(options)}</Text>
          </View>
          <View style={styles.dialogActionsWrapper}>
            <TouchableOpacity style={[styles.dialogAction, styles.confirmAction]} onPress={onDialogClose}>
              <Text style={styles.actionTitle}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dialogAction, styles.cancelAction]} onPress={onDialogClose}>
              <Text style={styles.actionTitle}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 150,
    width: 300,
    borderRadius: 16,
  },
  dialogTextWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogActionsWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 250,
  },
  dialogAction: {
    borderRadius: 16,
    padding: 12,
  },
  confirmAction: {
    ...theme.button.active,
  },
  cancelAction: {
    ...theme.button.disabled,
  },
  actionTitle: {
    color: '#fff',
    fontWeight: '600',
  },
});

DefaultDialog.propTypes = {
  open: bool.isRequired,
  options: object.isRequired,
  handleCloseDialog: func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleCloseDialog: (type, options) => dispatch(closeDialog(type, options)),
});

export default connect(
  null,
  mapDispatchToProps,
)(DefaultDialog);
