import React from 'react';
import {object} from 'prop-types';
import {View, Text} from 'react-native';
import styles from './HomeStyle';
// import {navigateTo} from '../../helpers/navigation';
// import ROUTES from '../../navigation/constants';
// include Button with route to camera to use camera

const Home = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.text}>This page is under development</Text>
      {/*<Button*/}
      {/*  title="Open Camera"*/}
      {/*  onPress={() => navigateTo(navigation, ROUTES.CHECK_IN)}*/}
      {/*/>*/}
    </View>
  );
};

Home.propTypes = {
  navigation: object.isRequired,
};

export default Home;
