import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';

const Camera = () => {
  const [barcode, setBarCode] = useState(null);

  const onBarCodeRecognized = barcodeScanned => {
    setBarCode(barcodeScanned);
    console.log(barcodeScanned.bounds.size)
  };

  const renderBarcode = (bounds, data) => (
    <React.Fragment>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 10,
          position: 'absolute',
          borderColor: '#F00',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 10,
          height: parseInt(bounds.size.height),
          width: parseInt(bounds.size.width),
          left: parseInt(bounds.origin.x, 10),
          top: parseInt(bounds.origin.y, 10),
        }}>
        <Text
          style={{
            color: '#F00',
            flex: 1,
            position: 'absolute',
            textAlign: 'center',
            backgroundColor: 'transparent',
          }}>
          {data}
        </Text>
      </View>
    </React.Fragment>
  );

  return (
    <RNCamera
      style={{
        flex: 1,
        width: '100%',
      }}
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

export default Camera;
