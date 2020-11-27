import React from 'react';
import { string } from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const Error = ({ error }) => {
  return (
    <View style={[styles.container, styles.centered]}>
      <Text>{error}</Text>
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

Error.propTypes = {
  error: string.isRequired,
};

export default Error;
