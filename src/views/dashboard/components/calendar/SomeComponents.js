import React from 'react';
import {View, Text} from 'react-native';
import {asCalendarConsumer} from 'react-native-calendars';

class SomeComponents extends React.Component {
  render() {
    console.log(this.props);
    return (
      <View>
        <Text> Hello world! </Text>
      </View>
    );
  }
}

export default asCalendarConsumer(SomeComponents);
