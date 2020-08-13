// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../../src/views/profile/Profile';
it('renders Profile correctly', () => {
  const tree = renderer.create(<Profile />).toJSON();
  expect(tree).toMatchSnapshot();
});
