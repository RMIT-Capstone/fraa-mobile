import React, {Component} from 'react';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';
import {
  View,
  Text,
  Button,
  // import bridge native module
  NativeModules,
  NativeEventEmitter,
  //   event control to submit/public
  NativeAppEventEmitter,
} from 'react-native';
const MyModelPackage = NativeModules.MyModel;
console.log('using native mymodel: ', NativeModules.MyModel);
console.log(
  'using native ReactNativeEventEmitter: ',
  NativeModules.ReactNativeEventEmitter,
);
const eventEmitter = new NativeEventEmitter(
  NativeModules.ReactNativeEventEmitter,
);
class MyModelComponent extends Component {
  state = {
    BackgroundLoadTask: 'Not Started',
    BackgroundInterprete: 'Not Started',
    counter: 0,
    isTfReady: false,
  };

  componentWillMount = () => {
    this.subscription3 = eventEmitter.addListener(
      'BackgroundInterprete',
      //
      event => {
        console.log('ReactNativeEventEmitter BackgroundInterprete: ', event);
        this.setState({BackgroundInterprete: event.status});
      },
    );
    this.subscription4 = eventEmitter.addListener(
      'BackgroundLoadTask',
      //
      event => {
        console.log('ReactNativeEventEmitter BackgroundLoadTask: ', event);
        this.setState({BackgroundLoadTask: event.status});
      },
    );
    // this.subscription1 = NativeAppEventEmitter.addListener(
    //   // the name of the event, as build in file.m
    //   'BackgroundLoadTask',
    //   //
    //   (event) => {
    //     console.log('get notify from event BackgroundLoadTask: ', event);
    //     this.setState({BackgroundLoadTask: event.status});
    //   },
    // );
    // console.log('current listenner: ', this.subscription);
    // this.subscription2 = NativeAppEventEmitter.addListener(
    //   // the name of the event, as build in file.m
    //   'BackgroundInterprete',
    //   //
    //   (event) => {
    //     console.log('get notify from event BackgroundInterprete: ', event);
    //     this.setState({BackgroundInterprete: event.status});
    //   },
    // );
  };
  componentWillUnmount = () => {
    // this.subscription1.remove();
    // this.subscription2.remove();
    this.subscription3.remove();
    this.subscription4.remove();
    // console.log('current listenner: ', this.subscription);
  };
  runLoadModel = () => {
    MyModelPackage.loadmodel();
  };
  runModelInterprete = () => {
    // MyModelPackage.doInterprete();
    MyModelPackage.testEvent();
  };
  getModel = () => {
    MyModelPackage.getmodel((error, modelInterprete) => {
      console.log('model loaded : ', modelInterprete);
    });
  };

  render() {
    return (
      <View>
        <Text>
          This is BackgroundLoadTask status: {this.state.BackgroundLoadTask}
        </Text>
        <Text>
          This is BackgroundInterprete status: {this.state.BackgroundInterprete}
        </Text>
        <Button
          title="load model"
          onPress={() => {
            console.log('press load model...');
            this.runLoadModel();
          }}
        />
        <Button
          title="model interprete"
          onPress={() => {
            console.log('press interprete model ...');
            this.runModelInterprete();
          }}
        />
        <Button
          title="get model"
          onPress={() => {
            console.log('press get model ...');
            this.getModel();
          }}
        />
      </View>
    );
  }
}

// MyBackGroundTask.propTypes = {
//   navigation: object.isRequired,
// };

export default MyModelComponent;
