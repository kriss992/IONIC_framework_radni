import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Camera } from '@ionic-native/camera/ngx';//odrađeno
import { IonicStorageModule } from '@ionic/storage';//odrađeno
import { Geolocation } from '@ionic-native/geolocation/ngx';//odrađeno
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';//odrađeno
import { Network } from '@ionic-native/network/ngx';//odrađeno
import { AlertController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';//odrađeno
//import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx'
//import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, /*HttpClientModule, HttpModule*/, IonicModule.forRoot(), AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    NativeGeocoder,
    Network,
    AlertController,
    Clipboard,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
