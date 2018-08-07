import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileTransfer } from '@ionic-native/file-transfer';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { CategoryService } from '../services/category.service';
import { EventService } from '../services/event.service';
import { LinguaService } from '../services/lingua.service';
import { UserService } from '../services/user.service';
import { MyApp } from './app.component';
import { httpInterceptorProviders } from '../interceptors';

import { PopoverComponent} from "../components/popover/popover";

//gli dico dove prendere la traduzione
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PopoverComponent
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
      name: 'myunivaq__db',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),


  ],
  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    HomePage,
    PopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LinguaService,
    EventService,
    CategoryService,
    UserService,
    httpInterceptorProviders,

    //per il trasferimento dei file
    FileTransfer,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
