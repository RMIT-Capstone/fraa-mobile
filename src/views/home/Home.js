import React from 'react';
import {object} from 'prop-types';
import {View, Text, Button} from 'react-native';
import styles from './HomeStyle';
import {navigateTo} from '../../helpers/navigation';
import ROUTES from '../../routes/constants';

const Home = ({navigation}) => {
  return (
    <View style={styles.centered}>
      <Text style={styles.text}>This is home</Text>
      <Button
        title="Go to Test"
        onPress={() => navigateTo(navigation, ROUTES.TEST)}
      />
    </View>
  );
};

Home.propTypes = {
  navigation: object.isRequired,
};

export default Home;
