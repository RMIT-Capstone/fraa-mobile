//
//  MyModel.m
//  fraa
//
//  Created by Donbosco on 8/28/20.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTEventEmitter.h>

@interface

RCT_EXTERN_MODULE(MyModel, NSObject);
RCT_EXTERN_METHOD(loadmodel);
////expose the method to get result
RCT_EXTERN_METHOD(getmodel: (RCTResponseSenderBlock)callback);
RCT_EXTERN_METHOD(doInterprete);
RCT_EXTERN_METHOD(testEvent);

// RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date)
- (dispatch_queue_t)methodQueue
{
  return dispatch_queue_create("com.facebook.React.AsyncLocalStorageQueue", DISPATCH_QUEUE_SERIAL);
}
+ (BOOL)requiresMainQueueSetup
{
//  return YES;  // only do this if your module initialization relies on calling UIKit!
   return NO;
}
@end


