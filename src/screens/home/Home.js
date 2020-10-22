import React from 'react';
import { object } from 'prop-types';
import { View, Text } from 'react-native';
import styles from './HomeStyle';

const Home = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.text}>This page is under development</Text>
    </View>
  );
};

Home.propTypes = {
  navigation: object,
};

export default Home;
