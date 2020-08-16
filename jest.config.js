// {
//   preset: 'react-native';
//   setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'];
// }

// jest.config.js
module.exports = {
  // verbose: true,
  // moduleDirectories: [
  //   'node_modules',
  //   'testUtils', // add the directory with the test-utils.js file, for example: // a utility folder
  //   // 'FRAA-MOBILE', // the root directory
  // ],
  // ... other options ...
  preset: 'react-native',
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './jestSetupFile.js',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    // 'node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation)',
  ],
};
