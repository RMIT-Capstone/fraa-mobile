// import React from 'react';
// import { arrayOf, bool, func, object, string } from 'prop-types';
// import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
// // import styles from './IdentityCameraStyle';
// import LottieView from 'lottie-react-native';
// import { RNCamera } from 'react-native-camera';
// const GenericLoading = require('../../assets/lottie-assets/GenericLoading');
//
// const IdentityCamera = ({
//   previewImage,
//   loading,
//   recognizedFaces,
//   fromDashboard,
//   onFacesDetected,
//   takePicture,
//   recapture,
//   registerOrVerifyIdentity,
// }) => {
//   const RenderFaceBounds = () => {
//     return recognizedFaces.map((face, index) => (
//       <View
//         key={index}
//         style={[
//           styles.faceBounds,
//           {
//             height: parseFloat(face.bounds.size.height),
//             width: parseFloat(face.bounds.size.width),
//             left: parseFloat(face.bounds.origin.x),
//             top: parseFloat(face.bounds.origin.y),
//           },
//         ]}
//       />
//     ));
//   };
//
//   const PendingView = () => (
//     <View style={styles.camera}>
//       <Text>Loading Camera...</Text>
//     </View>
//   );
//
//   const SnapButton = ({ camera }) => (
//     <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
//       {loading ? (
//         <LottieView source={GenericLoading} autoPlay loop style={styles.lottieView} />
//       ) : (
//         <Text style={styles.snapText}>Snap</Text>
//       )}
//     </TouchableOpacity>
//   );
//
//   SnapButton.propTypes = {
//     camera: object.isRequired,
//   };
//
//   const TooManyFaces = () => (
//     <View style={styles.tooManyFacesView}>
//       <Text style={styles.tooManyFacesText}>There are too many faces!</Text>
//     </View>
//   );
//
//   if (previewImage) {
//     return (
//       <ImageBackground source={{ uri: previewImage }} style={styles.camera}>
//         <View style={styles.snapButtonRow}>
//           <TouchableOpacity onPress={registerOrVerifyIdentity} style={styles.recapture}>
//             {loading ? (
//               <LottieView source={GenericLoading} autoPlay loop style={styles.lottieView} />
//             ) : (
//               <Text style={styles.snapText}>{fromDashboard ? 'Verify' : 'Register'}</Text>
//             )}
//           </TouchableOpacity>
//           <TouchableOpacity onPress={recapture} style={styles.recapture}>
//             <Text style={styles.snapText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     );
//   }
//
//   return (
//     <RNCamera
//       style={styles.camera}
//       type={RNCamera.Constants.Type.front}
//       onFacesDetected={onFacesDetected}
//       androidCameraPermissionOptions={{
//         title: 'Permission to use camera',
//         message: 'We need your permission to use your camera',
//         buttonPositive: 'Ok',
//         buttonNegative: 'Cancel',
//       }}
//       androidRecordAudioPermissionOptions={{
//         title: 'Permission to use audio recording',
//         message: 'We need your permission to use your audio',
//         buttonPositive: 'Ok',
//         buttonNegative: 'Cancel',
//       }}>
//       {({ camera, status }) => {
//         if (status !== 'READY') {
//           return <PendingView />;
//         }
//         return (
//           recognizedFaces.length !== 0 && (
//             <>
//               <RenderFaceBounds />
//               {recognizedFaces.length === 1 && <SnapButton camera={camera} />}
//               {recognizedFaces.length > 1 && <TooManyFaces />}
//             </>
//           )
//         );
//       }}
//     </RNCamera>
//   );
// };
//
// IdentityCamera.propTypes = {
//   previewImage: string.isRequired,
//   loading: bool.isRequired,
//   recognizedFaces: arrayOf(object).isRequired,
//   onFacesDetected: func.isRequired,
//   fromDashboard: bool.isRequired,
//   takePicture: func.isRequired,
//   recapture: func.isRequired,
//   registerOrVerifyIdentity: func.isRequired,
// };
//
// export default IdentityCamera;
