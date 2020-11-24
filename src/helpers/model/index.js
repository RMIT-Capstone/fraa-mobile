import RNFetchBlob from 'rn-fetch-blob';
import { GET_MODEL_S3 } from '../../constants/ApiEndpoints';

async function downloadFile(DOWNLOAD_URL, DEST_PATH) {
  console.log('Start downloading ......');
  await RNFetchBlob.config({
    path: DEST_PATH,
  })
    .fetch('GET', DOWNLOAD_URL)
    .then((res) => {
      console.log('The file saved to ', res.path());
    });
}

export function getModel() {
  let dirs = RNFetchBlob.fs.dirs;
  const targetPath = dirs.DocumentDir + '/model/mymodel112.tflite';
  RNFetchBlob.fs.exists(targetPath).then((exist) => {
    console.log(`The model is ${exist ? '' : 'not'} existed`);
    if (!exist) {
      downloadFile(GET_MODEL_S3, targetPath).then(() => console.log('Finished download'));
    }
  });
}

export async function getRegisteredImage(base64_image) {
  //base64Image is base64 string
  const dirs = RNFetchBlob.fs.dirs;
  const path = dirs.DocumentDir + 'image/registered_image.png';

  RNFetchBlob.fs.exists(path).then((exist) => {
    console.log(`file ${exist ? '' : 'not'} exists`);
    if (!exist) {
      RNFetchBlob.fs.writeFile(path, base64_image, 'base64').then((res) => {
        console.log('File : ', res);
      });
    }
  });
}
