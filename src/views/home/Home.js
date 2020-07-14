import React from 'react';
import {View, Text} from 'react-native';
import styles from './HomeStyle';

const Home = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.text}>This is home</Text>
    </View>
  );
};

export default Home;
