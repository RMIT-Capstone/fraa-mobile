import {getDistanceFromLatLngInMeters} from '../../src/helpers/utils/index';

it('get Distance correctly', () => {
  expect(
    getDistanceFromLatLngInMeters(10.8895, 10.8895, 21.027763, 105.83416),
  ).not.toBeUndefined();
  expect(
    getDistanceFromLatLngInMeters(10.8895, 10.8895, 21.027763, 105.83416),
  ).not.toBeNull();
});
