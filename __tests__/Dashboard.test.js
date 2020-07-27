// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from '../src/views/dashboard/Dashboard';
it('renders Home.js correctly', () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});
