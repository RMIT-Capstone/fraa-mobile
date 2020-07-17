import React from 'react';
import {Image, StyleSheet} from 'react-native';

const LOGO = require('../../assets/logo/Default_Logo.png');

const Header = () => {
  return <Image style={styles.logo} source={LOGO} />;
};

const styles = StyleSheet.create({
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default Header;
