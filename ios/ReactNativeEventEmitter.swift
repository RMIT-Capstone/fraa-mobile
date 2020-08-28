//
//  ReactNativeEventEmitter.swift
//  fraa
//
//  Created by Donbosco on 8/28/20.
//


import UIKit
import Foundation
@objc(ReactNativeEventEmitter)
open class ReactNativeEventEmitter: RCTEventEmitter {
  override init() {
      super.init()
      EventEmitter.sharedInstance.registerEventEmitter(eventEmitter: self)
  }
  @objc
 static var serialQueue = DispatchQueue(label: "ReactNativeEventEmitter.serial.queue")
  
  /// Base overide for RCTEventEmitter.
  ///
  /// - Returns: all supported events
  @objc open override func supportedEvents() -> [String] {
      return EventEmitter.sharedInstance.allEvents
  }
}

