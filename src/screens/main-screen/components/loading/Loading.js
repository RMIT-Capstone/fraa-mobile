import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Loading = () => {
  return (
    <View style={[styles.container, styles.centered]}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
