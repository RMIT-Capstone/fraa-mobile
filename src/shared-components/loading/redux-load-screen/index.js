import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// TODO
// is this loading component necessary ? can it be reused for something else ?

const ReduxLoading = () => {
  return (
    <View style={styles.centered}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReduxLoading;
