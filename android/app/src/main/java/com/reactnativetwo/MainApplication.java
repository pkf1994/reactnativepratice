package com.reactnativetwo;

import android.app.Application;

import com.example.umeng.DplusReactPackage;
import com.example.umeng.RNUMConfigure;
import com.facebook.react.ReactApplication;
import me.listenzz.modal.TranslucentModalReactPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.umeng.commonsdk.UMConfigure;

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
            new TranslucentModalReactPackage(),
            new RNCWebViewPackage(),
            new RNCViewPagerPackage(),
            new AsyncStoragePackage(),
            new ReanimatedPackage(),
            new VectorIconsPackage(),
            new RNGestureHandlerPackage(),
            new DplusReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
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
    UMConfigure.setLogEnabled(true);
    //初始化组件化基础库, 统计SDK/推送SDK/分享SDK都必须调用此初始化接口
    RNUMConfigure.init(this, "5d2808f40cafb29ccb000d05", "Umeng", UMConfigure.DEVICE_TYPE_PHONE,
            "");
  }
}
