import React, { useEffect } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { Modal, View, Text, StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme';
import { closeToast, getToastState, TOAST_TYPES } from '../../redux/reducers/ToastReducer';

const windowWidth = Dimensions.get('window').width;

const Toast = ({ toast, handleCloseToast }) => {
  const { open, type, content, duration } = toast;

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        handleCloseToast();
      }, duration);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [open]);

  const backgroundColor = () => {
    switch (type) {
      case TOAST_TYPES.INFO:
        return { backgroundColor: theme.palette.primary.blue };
      case TOAST_TYPES.SUCCESS:
        return { backgroundColor: theme.palette.secondary.green };
      case TOAST_TYPES.ERROR:
        return { backgroundColor: theme.palette.primary.red };
      default:
        return { backgroundColor: '#00000' };
    }
  };

  return (
    <Modal animationType="slide" transparent visible={open}>
      <View style={[styles.container, backgroundColor()]}>
        <Text style={styles.toastText}>{content}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: windowWidth - 110,
    position: 'absolute',
    padding: 10,
    marginLeft: 55,
    bottom: 15,
    borderWidth: 0.5,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastText: {
    color: '#ffffff',
  },
});

Toast.propTypes = {
  toast: object.isRequired,
  handleCloseToast: func.isRequired,
};

const mapStateToProps = (state) => ({
  toast: getToastState(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleCloseToast: () => dispatch(closeToast()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
