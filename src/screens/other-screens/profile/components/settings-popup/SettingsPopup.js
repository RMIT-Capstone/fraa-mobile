import React from 'react';
import { Modal, Dimensions, TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';

const SettingsPopUp = ({ showSettings }) => (
  <Modal animation="fade" transparent visible={showSettings}>
    <View
      style={{
        height: '50%',
        marginTop: 'auto',
        backgroundColor:'blue'
      }}>
      <Text>Hello World!</Text>
    </View>
  </Modal>
);

export default SettingsPopUp;
