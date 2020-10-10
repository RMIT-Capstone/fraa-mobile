// import React, { useState } from 'react';
// import { func, object } from 'prop-types';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import IdentityCamera from './IdentityCamera';
// import RNLocation from 'react-native-location';
// import { openDialog } from '../../../redux/reducers/DialogReducer';
// import DIALOG from '../../../global-components/dialog/constants';
// import ROUTES from '../../navigation/routes';
// import { navigateTo } from '../../helpers/navigation';
// import { getUserState, setUserRegisteredIdentity } from '../../redux/reducers/UserReducer';
//
// const RegisterIdentityWrapper = ({
//   handleOpenDialog,
//   user,
//   route: {
//     params: { fromDashboard },
//   },
//   navigation,
//   handleSetUserRegisteredIdentity,
// }) => {
//   const [recognizedFaces, setRecognizedFaces] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [base64Preview, setBase64Preview] = useState('');
//   const [previewImage, setPreviewImage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const identityUrl = 'http://159.89.205.12';
//
//   const onFacesDetected = ({ faces }) => {
//     if (faces) {
//       setRecognizedFaces(faces);
//     } else {
//       setRecognizedFaces([]);
//     }
//   };
//
//   const getLocation = async () => {
//     await RNLocation.configure({
//       distanceFilter: 1,
//       desiredAccuracy: {
//         ios: 'best',
//         android: 'balancedPowerAccuracy',
//       },
//       showsBackgroundLocationIndicator: true,
//     });
//
//     let granted = await RNLocation.requestPermission({
//       ios: 'whenInUse',
//       android: { detail: 'fine' },
//     });
//
//     if (granted) {
//       RNLocation.subscribeToLocationUpdates((locations) => {
//         locations.forEach((location) => {
//           setUserLocation(location);
//         });
//       });
//     }
//   };
//
//   const takePicture = async (camera) => {
//     const options = { quality: 0.5, base64: true };
//     setLoading(true);
//     try {
//       const data = await camera.takePictureAsync(options);
//       await getLocation();
//       if (data) {
//         const { uri, base64 } = data;
//         setBase64Preview(base64);
//         setPreviewImage(uri);
//         setLoading(false);
//       }
//     } catch (errorCapture) {
//       console.warn(errorCapture);
//     }
//   };
//
//   const recapture = () => {
//     setPreviewImage('');
//   };
//
//   const registerOrVerifyIdentity = async () => {
//     setLoading(true);
//     const base64Data = new FormData();
//     base64Data.append('image', base64Preview);
//     const url = fromDashboard
//       ? `${identityUrl}/verify/trungduong0103@gmail.com`
//       : `${identityUrl}/register/trungduong0103@gmail.com`;
//     const config = {
//       method: 'POST',
//       url,
//       data: base64Data,
//     };
//     try {
//       const { data } = await axios(config);
//       if (data) {
//         setLoading(false);
//         handleOpenDialog(DIALOG.DEFAULT, data);
//         if (fromDashboard) {
//           navigateTo(navigation, ROUTES.DASHBOARD);
//         } else {
//           handleSetUserRegisteredIdentity(true);
//           navigateTo(navigation, ROUTES.PROFILE);
//         }
//       }
//     } catch (errorRegisterOrVerifyIdentity) {
//       handleOpenDialog(DIALOG.DEFAULT, 'Something went wrong');
//       console.log(errorRegisterOrVerifyIdentity);
//     }
//   };
//
//   return (
//     <IdentityCamera
//       previewImage={previewImage}
//       loading={loading}
//       recognizedFaces={recognizedFaces}
//       fromDashboard={fromDashboard}
//       onFacesDetected={onFacesDetected}
//       takePicture={takePicture}
//       recapture={recapture}
//       registerOrVerifyIdentity={registerOrVerifyIdentity}
//     />
//   );
// };
//
// RegisterIdentityWrapper.propTypes = {
//   handleOpenDialog: func.isRequired,
//   user: object.isRequired,
//   handleSetUserRegisteredIdentity: func.isRequired,
//   route: object.isRequired,
//   navigation: object.isRequired,
// };
//
// const mapStateToProps = (state) => ({
//   user: getUserState(state),
// });
//
// const mapDispatchToProps = (dispatch) => ({
//   handleOpenDialog: (type, options) => dispatch(openDialog(type, options)),
//   handleSetUserRegisteredIdentity: (registered) => dispatch(setUserRegisteredIdentity(registered)),
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(RegisterIdentityWrapper);
