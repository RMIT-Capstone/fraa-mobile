/* eslint-disable no-console */
import RNFetchBlob from 'rn-fetch-blob';
// import { MODEL_URL } from '../../constants/ApiEndpoints';

// async function downloadFile(DOWNLOAD_URL) {
//   console.log('Start downloading ......');
//   const { dirs } = RNFetchBlob.fs;
//   await RNFetchBlob.config({
//     path: `${dirs.DocumentDir}/mymodel112.tflite`,
//   })
//     .fetch('GET', DOWNLOAD_URL)
//     .then((res) => {
//       console.log('The file saved to ', res.path());
//     });
// }
//
// export function getModel() {
//   const { dirs } = RNFetchBlob.fs;
//   const targetPath = `${dirs.DocumentDir}/mymodel112.tflite`;
//   RNFetchBlob.fs.exists(targetPath).then((exist) => {
//     console.log(`The model is ${exist ? '' : 'not'} existed`);
//     if (!exist) {
//       downloadFile(MODEL_URL).then(() => console.log('Finished download'));
//     }
//   });
// }

export const checkRegisteredImage = async () => {
  const { dirs } = RNFetchBlob.fs;
  const path = `${dirs.DocumentDir}/User`;
  try {
    return await RNFetchBlob.fs.exists(path);
  } catch (errorCheckRegisteredImage) {
    console.warn(errorCheckRegisteredImage);
  }
};

export const removeRegisteredImage = async () => {
  const { dirs } = RNFetchBlob.fs;
  const path = `${dirs.DocumentDir}/User`;
  try {
    return await RNFetchBlob.fs.unlink(path);
  } catch (errorUnlinkImage) {
    console.warn(errorUnlinkImage);
  }
};

// export function getRegisteredImage(base64Image) {
//   // base64Image is base64 string
//   const { dirs } = RNFetchBlob.fs;
//   // const path = `${dirs.DocumentDir}/image/registered_image.png`;
//
//   // RNFetchBlob.fs.exists(path).then((exist) => {
//   //   console.log(`The image is ${exist ? '' : 'not'} existed`);
//   //   if (!exist) {
//   //     RNFetchBlob.fs.writeFile(path, base64Image, 'base64').then(() => {
//   //       console.log('The image saved at : ', path);
//   //     });
//   //   }
//   // });
// }
