import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {object, func} from 'prop-types';
import {Modal, View, Text, StyleSheet} from 'react-native';
import theme from '../../theme';
import {
  closeToast,
  getToastState,
} from '../../config/redux/reducers/ToastReducer';

const FraaToast = ({toast, handleCloseToast}) => {
  const [toastOpen, setToastOpen] = useState(false);
  const {open, content, type, position} = toast;
  useEffect(() => {
    setToastOpen(open);
  }, [open]);

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        setToastOpen(false);
        handleCloseToast();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [handleCloseToast, open]);

  const toastBackground = () => {
    if (type === 'success') {
      return {backgroundColor: theme.palette.secondary.green};
    } else if (type === 'error') {
      return {backgroundColor: theme.palette.primary.red};
    } else if (type === 'info') {
      return {backgroundColor: theme.palette.secondary.oceanBlue};
    } else if (type === 'warning') {
      return {backgroundColor: theme.palette.secondary.yellow};
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={toastOpen}>
      <View style={styles.centeredView}>
        <View
          style={
            position === 'bottom'
              ? [
                  styles.toastContentWrapper,
                  styles.bottomWrapper,
                  toastBackground(),
                ]
              : [
                  styles.toastContentWrapper,
                  styles.topWrapper,
                  toastBackground(),
                ]
          }>
          <Text style={styles.toastContentText}>{content}</Text>
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
  toastContentWrapper: {
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    padding: 15,
    borderRadius: 14,
  },
  bottomWrapper: {
    bottom: 25,
  },
  topWrapper: {
    top: 60,
  },
  toastContentText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

FraaToast.propTypes = {
  toast: object.isRequired,
  handleCloseToast: func.isRequired,
};

const mapStateToProps = state => ({
  toast: getToastState(state),
});

const mapDispatchToProps = dispatch => ({
  handleCloseToast: () => dispatch(closeToast()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FraaToast);
