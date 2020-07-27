import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';

const Camera = () => {
  const [barcode, setBarCode] = useState(null);

  const onBarCodeRecognized = barcodeScanned => {
    setBarCode(barcodeScanned);
  };

  const renderBarcode = (bounds, data) => (
    <React.Fragment>
      <View
        style={[
          styles.barcodeBounds,
          {
            height: parseInt(bounds.size.height, 10),
            width: parseInt(bounds.size.width, 10),
            left: parseInt(bounds.origin.x, 10),
            top: parseInt(bounds.origin.y, 10),
          },
        ]}>
        <Text style={styles.barcodeText}>{data}</Text>
      </View>
    </React.Fragment>
  );

  return (
    <RNCamera
      style={styles.camera}
      ref={ref => {
        this.camera = ref;
      }}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
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
      {barcode && <View>{renderBarcode(barcode.bounds, barcode.data)}</View>}
    </RNCamera>
  );
};

const styles = StyleSheet.create({
  barcodeBounds: {
    borderWidth: 2,
    borderRadius: 10,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
  },
  barcodeText: {
    color: '#F00',
    flex: 1,
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
});

export default Camera;
