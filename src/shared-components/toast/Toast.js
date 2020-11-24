import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const Toast = () => (
  <View style={styles.container}>
    <Text>Hello World!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 50,
    padding: 10,
    width: windowWidth - 50,
    position: 'absolute',
    marginLeft: 25,
    bottom: 0,
    borderWidth: 0.5,
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Toast;
