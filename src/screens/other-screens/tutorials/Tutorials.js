import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

const Tutorials = ({ navigation }) => (
  <View style={[styles.container, styles.centered]}>
    <Text>Tutorials</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Tutorials;
