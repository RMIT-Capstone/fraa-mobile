import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const MainPage = () => {
  return (
    <View style={styles.centered}>
      <View style={styles.content}>
        <Text>Content</Text>
      </View>
      <View style={styles.bottomTabs}>
        <TouchableOpacity style={styles.tab}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text>Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabs: {
    flex: 0.5,
    flexDirection: 'row',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 2,
  }
});

export default MainPage;
