// import React from 'react';
// import { View, Text } from 'react-native';
// import { asCalendarConsumer } from 'react-native-calendars';
//
// class FRAAAgenda extends React.Component {
//   render() {
//     return (
//       <View>
//         <Text> This is agenda </Text>
//       </View>
//     );
//   }
// }
//
// export default asCalendarConsumer(FRAAAgenda);

import React from 'react';
import { View, Text } from 'react-native';

const FRAAAgenda = ({ agendaSessions }) => {
  return (
    <View>
      <Text>{JSON.stringify(agendaSessions)}</Text>
    </View>
  );
};

export default FRAAAgenda;
