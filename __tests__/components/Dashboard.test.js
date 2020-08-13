// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from '../../src/views/dashboard/Dashboard';
it('renders Dashboard correctly', () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});
