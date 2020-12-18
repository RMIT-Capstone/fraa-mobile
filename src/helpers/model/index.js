import RNFetchBlob from 'rn-fetch-blob';
import { MODEL_URL } from '../../constants/ApiEndpoints';

async function downloadFile(DOWNLOAD_URL) {
  console.log('Start downloading ......');
  let dirs = RNFetchBlob.fs.dirs;
  await RNFetchBlob.config({
    path: dirs.DocumentDir + '/mymodel112.tflite',
  })
    .fetch('GET', DOWNLOAD_URL)
    .then((res) => {
      console.log('The file saved to ', res.path());
    });
}

export function getModel() {
  let dirs = RNFetchBlob.fs.dirs;
  const targetPath = dirs.DocumentDir + '/mymodel112.tflite';
  RNFetchBlob.fs.exists(targetPath).then((exist) => {
    console.log(`The model is ${exist ? '' : 'not'} existed`);
    if (!exist) {
      downloadFile(MODEL_URL).then(() => console.log('Finished download'));
    }
  });
}

export async function getRegisteredImage(base64_image) {
  //base64Image is base64 string
  const dirs = RNFetchBlob.fs.dirs;
  const path = dirs.DocumentDir + '/image/registered_image.png';

  RNFetchBlob.fs.exists(path).then((exist) => {
    console.log(`The image is ${exist ? '' : 'not'} existed`);
    if (!exist) {
      RNFetchBlob.fs.writeFile(path, base64_image, 'base64').then((res) => {
        console.log('The image saved at : ', path);
      });
    }
  });
}
