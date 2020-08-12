// @flow
import React from 'react';
import {object} from 'prop-types';
import {View, Text, Button} from 'react-native';
import styles from './HomeStyle';
import {navigateTo} from '../../helpers/navigation';
import ROUTES from '../../routes/constants';
type Props = {
  navigation: object,
};
const Home = ({navigation}: Props) => {
  return (
    <View testID="Home" style={styles.centered}>
      <Text style={styles.text}>This is home</Text>
      <Button
        testID="Home_testBtn"
        // title="Go to Test"
        // onPress={() => navigateTo(navigation, ROUTES.TEST)}
        title="Open Camera"
        onPress={() => navigateTo(navigation, ROUTES.CHECK_IN)}
      />
    </View>
  );
};

Home.propTypes = {
  navigation: object.isRequired,
};

export default Home;
