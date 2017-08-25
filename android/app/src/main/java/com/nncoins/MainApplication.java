package com.nncoins;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecomponent.swiperefreshlayout.RCTSwipeRefreshLayoutPackage;
import com.robinpowered.react.Intercom.IntercomPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.facebook.soloader.SoLoader;
import com.smooch.rnsmooch.ReactNativeSmoochPackage;

import java.util.Arrays;
import java.util.List;

import io.smooch.core.Smooch;


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
            new RCTSwipeRefreshLayoutPackage(),
            new IntercomPackage(),
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
    //Smooch.init(this, "7jaa5xt3vv4glultcdus28bnr");
    Intercom.initialize(getApplicationContext(), "your api key", "your app id");

  }
}
