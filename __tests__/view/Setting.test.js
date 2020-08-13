// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Settings from '../../src/views/settings/Settings';
it('renders Settings correctly', () => {
  const tree = renderer.create(<Settings />).toJSON();
  expect(tree).toMatchSnapshot();
});
