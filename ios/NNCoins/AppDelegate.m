/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>
#import <Smooch/Smooch.h>
@import Firebase;


//#import "Intercom/intercom.h"



@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  
  [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent];
  
  SKTSettings* settings = [SKTSettings settingsWithAppId:@"59675985f7801557005670b3"];
  
  UIColor *themeRed = [UIColor colorWithRed:171/255.0 green:35/255.0 blue:37/255.0 alpha:1.0];
  UIColor *gray100 = [UIColor colorWithRed:230/255.0 green:230/255.0 blue:230/255.0 alpha:1.0];

  
  settings.conversationAccentColor = themeRed;
  //settings.conversationStatusBarStyle = UIStatusBarStyleLightContent;
  
  [[UINavigationBar appearance] setBarTintColor:gray100];
  [[UINavigationBar appearance] setTintColor:themeRed];
  [[UINavigationBar appearance] setTitleTextAttributes:@{ NSForegroundColorAttributeName : themeRed }];
  
  [Smooch initWithSettings:settings completionHandler:nil];


  
  [Fabric with:@[[Crashlytics class]]];

  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"NNCoins"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
