import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { CategoryService } from '../services/category.service';
import { EventService } from '../services/event.service';
import { LinguaService } from '../services/lingua.service';
import { UserService } from '../services/user.service';
import { MyApp } from './app.component';
import { httpInterceptorProviders } from '../interceptors';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from "@ionic-native/google-maps"

import { PopoverComponent} from "../components/popover/popover";
import { SearchpopoverComponent } from "../components/searchpopover/searchpopover";


import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { LOCALE_ID} from "@angular/core";

import { InAppBrowser } from "@ionic-native/in-app-browser";
import { SocialSharing } from "@ionic-native/social-sharing";

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import {ResultPage} from "../pages/result/result";

registerLocaleData(localeIt, 'it');

//gli dico dove prendere la traduzione
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    PopoverComponent,
    SearchpopoverComponent,
    ResultPage
  ],

  imports: [
    BrowserModule,

    // //modulo per il trasferimento dei file
    // // FileTransferObject,
    // FileTransfer,

    IonicModule.forRoot(MyApp),
    //modulo per le chiamate http
    HttpClientModule,

    //modulo traduzione
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),

    //modulo storage
    IonicStorageModule.forRoot({
      name: 'unievent__db',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),


  ],
  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    PopoverComponent,
    SearchpopoverComponent,
    ResultPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LinguaService,
    EventService,
    CategoryService,
    UserService,
    httpInterceptorProviders,
    Geolocation,
    GoogleMaps,
    InAppBrowser,
    SocialSharing,

    File,
    Transfer,
    Camera,
    FilePath,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: 'it'}
  ]
})
export class AppModule {}
