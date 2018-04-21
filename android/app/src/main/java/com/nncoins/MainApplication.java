package com.nncoins;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.RNFirebasePackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.smooch.rnsmooch.ReactNativeSmoochPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.wix.reactnativenotifications.RNNotificationsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import io.invertase.firebase.RNFirebasePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.smooch.rnsmooch.ReactNativeSmoochPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.wix.reactnativenotifications.RNNotificationsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import io.invertase.firebase.RNFirebasePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.smooch.rnsmooch.ReactNativeSmoochPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.smooch.core.Smooch;
import io.smooch.core.SmoochCallback;
import io.smooch.core.Settings;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;



import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
            new RNFirebasePackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new ReactNativeSmoochPackage(),
            new ReactNativePushNotificationPackage(),
            new RNNotificationsPackage(),
            new LinearGradientPackage(),
            new GoogleAnalyticsBridgePackage(),
            new RNFirebasePackage(),
            new RNFetchBlobPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new ReactNativeSmoochPackage(),
            new ReactNativePushNotificationPackage(),
            new RNNotificationsPackage(),
            new LinearGradientPackage(),
            new GoogleAnalyticsBridgePackage(),
            new RNFirebasePackage(),
            new RNFetchBlobPackage(),
            new LinearGradientPackage(),
            new RNFirebasePackage(),
              new RNFirebaseAnalyticsPackage(),
            new ReactNativePushNotificationPackage(),
            new ReactVideoPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new GoogleAnalyticsBridgePackage(),
            new ReactNativeSmoochPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    Smooch.init(this, new Settings("59675985f7801557005670b3"), new SmoochCallback() {
          @Override
          public void run(Response response) {
              // Your code after init is complete
          }
      });
  }
}
