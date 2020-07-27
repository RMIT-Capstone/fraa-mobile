import React from 'react';
import {func} from 'prop-types';
import {connect} from 'react-redux';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import theme from '../../../theme';
import {openToast} from '../../../config/redux/reducers/ToastReducer';
import {openDialog} from '../../../config/redux/reducers/DialogReducer';
import DIALOG from '../../../shared-components/dialog/constants';

const SharedComponentsTest = ({handleOpenToast, handleOpenDialog}) => {
  return (
    <View>
      <View style={styles.testRow}>
        <TouchableOpacity
          testID="SharedComponentsTestToastBtn"
          style={[
            styles.button,
            {backgroundColor: theme.palette.secondary.yellow},
          ]}
          onPress={() =>
            handleOpenToast('warning', 'Warning toast present', 'top')
          }>
          <Text style={styles.buttonTitle}>Warning Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: theme.palette.secondary.green},
          ]}
          onPress={() =>
            handleOpenToast('success', 'Success toast present', 'bottom')
          }>
          <Text style={styles.buttonTitle}>Success Toast</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.testRow}>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: theme.palette.secondary.oceanBlue},
          ]}
          onPress={() =>
            handleOpenToast('info', 'Info toast present', 'bottom')
          }>
          <Text style={styles.buttonTitle}>Info Toast</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.palette.primary.red}]}
          onPress={() =>
            handleOpenToast('error', 'Error toast present', 'bottom')
          }>
          <Text style={styles.buttonTitle}>Error Toast</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.testRow}>
        <TouchableOpacity
          testID="SharedComponentsTestDialogBtn"
          style={styles.button}
          onPress={() =>
            handleOpenDialog(DIALOG.DEFAULT, {content: 'DIALOG TEST'})
          }>
          <Text style={styles.buttonTitle}>Open Dialog</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  testRow: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    ...theme.button.active,
    padding: 10,
    marginRight: 10,
  },
  buttonTitle: {
    color: '#fff',
    fontWeight: '600',
  },
});

SharedComponentsTest.propTypes = {
  handleOpenToast: func.isRequired,
  handleOpenDialog: func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleOpenToast: (type, content, position) =>
    dispatch(openToast(type, content, position)),
  handleOpenDialog: (type, options) => dispatch(openDialog(type, options)),
});

export default connect(
  null,
  mapDispatchToProps,
)(SharedComponentsTest);
