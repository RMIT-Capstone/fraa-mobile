import React, {useState, useEffect} from 'react';
import {func, object} from 'prop-types';
import {connect} from 'react-redux';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {openDialog} from '../../config/redux/reducers/DialogReducer';
import DIALOG from '../../shared-components/dialog/constants';
import {
  clearCheckInCourse,
  getCheckInCourseState,
  setCheckInCourse,
} from '../../config/redux/reducers/CheckInCourseReducer';
import theme from '../../theme';

const QRCodeCamera = ({
  handleOpenDialog,
  handleSetCheckInCourse,
  checkInCourse,
}) => {
  const [scan, setScan] = useState(false);

  useEffect(() => {
    if (isEmpty(checkInCourse)) {
      setScan(false);
    }
  }, [checkInCourse]);

  const isEmpty = obj => {
    // eslint-disable-next-line no-unused-vars
    for (let prop in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  };

  const onBarCodeRecognized = barcodeScanned => {
    const barcodeData = JSON.parse(barcodeScanned.data);
    if (
      scan &&
      barcodeData.origin === 'FRAA-CheckIn' &&
      barcodeData.course !== checkInCourse.course
    ) {
      if (barcodeData.course !== checkInCourse.course) {
        handleSetCheckInCourse(barcodeData);
        return handleOpenDialog(DIALOG.CHECKIN, barcodeData);
      }
    }
  };

  return (
    <RNCamera
      style={styles.camera}
      ref={ref => {
        this.camera = ref;
      }}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}
      androidCameraPermissionOptions={{
        title: 'Permission to use qr-code-camera',
        message: 'We need your permission to use your qr-code-camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      onBarCodeRead={onBarCodeRecognized}>
      <TouchableOpacity style={styles.rescanButton} onPress={setScan}>
        <Text style={styles.rescanText}>Scan</Text>
      </TouchableOpacity>
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rescanButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: theme.palette.primary.red,
    padding: 15,
    borderRadius: 16,
  },
  rescanText: {
    color: '#fff',
  },
});

QRCodeCamera.propTypes = {
  handleOpenDialog: func.isRequired,
  handleSetCheckInCourse: func.isRequired,
  checkInCourse: object.isRequired,
};

const mapStateToProps = state => ({
  checkInCourse: getCheckInCourseState(state),
});

const mapDispatchToProps = dispatch => ({
  handleOpenDialog: (type, options) => dispatch(openDialog(type, options)),
  handleSetCheckInCourse: course => dispatch(setCheckInCourse(course)),
  handleClearCheckInCourse: () => dispatch(clearCheckInCourse()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QRCodeCamera);
