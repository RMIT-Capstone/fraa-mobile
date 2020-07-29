import React, {useState, useEffect} from 'react';
import {func, object} from 'prop-types';
import {connect} from 'react-redux';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {openDialog} from '../../../config/redux/reducers/DialogReducer';
import DIALOG from '../../../shared-components/dialog/constants';
import {getCheckInProcessState} from '../../../config/redux/reducers/CheckInProcessReducer';
import theme from '../../../theme';

const QRCodeCamera = ({handleOpenDialog, checkInProcess}) => {
  const [scan, setScan] = useState(false);
  const [barcodeFound, setBarcodeFound] = useState(false);

  useEffect(() => {
    if (JSON.stringify(checkInProcess.attendanceInfo) === JSON.stringify({})) {
      setBarcodeFound(false);
    }
  }, [checkInProcess.attendanceInfo]);

  const onBarCodeRecognized = barcodeScanned => {
    if (barcodeScanned.data && barcodeScanned.data.includes('origin')) {
      const barcodeData = JSON.parse(barcodeScanned.data);
      if (
        scan &&
        barcodeData.origin === 'FRAA-CheckIn' &&
        barcodeData.course !== checkInProcess.attendanceInfo.course
      ) {
        setScan(false);
        setBarcodeFound(true);
        return handleOpenDialog(DIALOG.CHECKIN, barcodeData);
      }
    }
  };

  return (
    <RNCamera
      style={styles.camera}
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
      <TouchableOpacity
        onPress={() => setScan(true)}
        disabled={scan && !barcodeFound}
        style={styles.rescanButton}>
        <Text style={styles.rescanText}>
          {!scan && !barcodeFound && 'Scan'}
          {scan && !barcodeFound && 'Scanning...'}
          {barcodeFound && 'Barcode Found!'}
        </Text>
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
  checkInProcess: object.isRequired,
};

const mapStateToProps = state => ({
  checkInProcess: getCheckInProcessState(state),
});

const mapDispatchToProps = dispatch => ({
  handleOpenDialog: (type, options) => dispatch(openDialog(type, options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QRCodeCamera);
