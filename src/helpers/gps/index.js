/* eslint-disable operator-linebreak, import/prefer-default-export */
export function getDistanceFromLatLngInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const theta1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const theta2 = (lat2 * Math.PI) / 180;
  const deltaTheta = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaTheta / 2) * Math.sin(deltaTheta / 2) +
    Math.cos(theta1) * Math.cos(theta2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // in metres
}
