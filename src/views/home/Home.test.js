// @flow
import React from 'react';
import 'react-native-gesture-handler';
import {
  fireEvent,
  render,
  waitFor,
  cleanup,
} from '../../helpers/testUtiils/test-utils';
import Home from './Home';
import {Button} from 'react-native';

test('Home render', () => {
  let nav = {};
  const {getByTestId, getByText, queryByTestId, toJSON} = render(
    <Home navigation={nav} />,
  );
});

describe('Home.js should render correctly', () => {
  let navi = {};
  it('it should contain text', () => {
    let reactDom = render(<Home navigation={navi} />);
    const text = reactDom.getByTestId('Home_txt');
    expect(text.props.children).toBe('This is home');
  });
  it('it should contain button', () => {
    let reactDom = render(<Home navigation={navi} />);
    const openCameraBtn = reactDom.UNSAFE_queryAllByType(Button);
    const a = reactDom.UNSAFE_getAllByType(Button);
    // expect(() => reactDom.UNSAFE_getAllByType(Button)).toThrow(
    //   'No instances found',
    // );
    // note: since button is a wrapper in react native, we can not access it???
    expect(a.length).toBe(1);
  });
});
