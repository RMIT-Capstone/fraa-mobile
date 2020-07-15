import React from 'react';
import {func} from 'prop-types';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {openToast} from '../../config/redux/reducers/ToastReducer';
import SharedComponentsTest from './shared-components-test';

const Test = () => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.textView}>
        <Text>Add code bellow this line in Test.js for testing</Text>
      </View>
      <View style={styles.testComponentWrapper}>
        <SharedComponentsTest />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  testComponentWrapper: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Test.propTypes = {
  handleOpenToast: func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleOpenToast: (type, content, position) =>
    dispatch(openToast(type, content, position)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Test);
