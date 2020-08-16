control props using PropTypes
check runtime error using flow
https://flow.org/en/docs/install/

- yarn run flow

unit/component testing using jest
https://callstack.github.io/react-native-testing-library/docs/getting-started

- yarn test

simulator testing with detox; the files are in folder e2e
note: run "react-native run-ios" to get the command required to build xcode app from command line
paste the commnand to .detoxrc.json with info:
-workspace ios/fraa.xcworkspace -configuration Debug -scheme fraa -derivedDataPath ios/build
then run "detox build --configuration=ios
then run "detox test --configuration=ios

- brew tap wix/brew
- brew install applesimutils
- npm install -g detox-cli
- detox build --configuration=ios
- detox test--configuration=ios
