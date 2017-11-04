package com.nncoins;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecomponent.swiperefreshlayout.RCTSwipeRefreshLayoutPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.smooch.rnsmooch.ReactNativeSmoochPackage;
import io.smooch.core.Smooch;
import io.smooch.core.SmoochCallback;
import io.smooch.core.Settings;



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
              new RCTSwipeRefreshLayoutPackage(),
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

    Smooch.init(this, new Settings("7jaa5xt3vv4glultcdus28bnr"), new SmoochCallback() {
          @Override
          public void run(Response response) {
              // Your code after init is complete
          }
      });
  }
}
