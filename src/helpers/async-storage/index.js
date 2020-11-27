import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAsyncStringData = async (key, stringValue) => {
  try {
    await AsyncStorage.setItem(key, stringValue);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};

export const storeAsyncObjectData = async (key, objectValue) => {
  try {
    const jsonValue = JSON.stringify(objectValue);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};

export const getAsyncStringData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};

export const getAsyncObjectData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e);
  }
};
