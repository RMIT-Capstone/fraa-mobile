import React from 'react';
import {object} from 'prop-types';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

const TabWithIcon = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.row}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            key={index}>
            <Text
              style={
                isFocused
                  ? [styles.tabTitle, styles.tabTitleFocused]
                  : [styles.tabTitle, styles.tabTitleUnfocused]
              }>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabImage: {},
  tabTitle: {
    fontSize: 10,
  },
  tabTitleUnfocused: {
    color: '#c4c4c4',
  },
  tabTitleFocused: {
    color: '#000',
  },
});

TabWithIcon.propTypes = {
  state: object.isRequired,
  descriptors: object.isRequired,
  navigation: object.isRequired,
};

export default TabWithIcon;
