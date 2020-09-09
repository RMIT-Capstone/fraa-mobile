import React, {useState, useEffect} from 'react';
import {func, object} from 'prop-types';
import {connect} from 'react-redux';
import {RNCamera} from 'react-native-camera';
import {Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './QRCodeCameraStyle';
import DIALOG from '../../../../shared-components/dialog/constants';
import {openDialog} from '../../../../config/redux/reducers/DialogReducer';
import {getCheckInProcessState} from '../../../../config/redux/reducers/CheckInProcessReducer';
const GenericLoading = require('../../../../assets/lottie-assets/GenericLoading');

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
      <TouchableOpacity onPress={() => setScan(true)} disabled={scan && !barcodeFound} style={styles.rescanButton}>
        <Text style={styles.rescanText}>
          {!scan && !barcodeFound && 'Scan'}
          {scan && !barcodeFound && <LottieView source={GenericLoading} autoPlay loop style={styles.lottieView} />}
          {barcodeFound && 'Barcode Found!'}
        </Text>
      </TouchableOpacity>
    </RNCamera>
  );
};

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
