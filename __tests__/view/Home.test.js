// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../../src/views/home/Home';

test('renders Home correctly', () => {
  const navigation = {};
  const tree = renderer.create(<Home navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
