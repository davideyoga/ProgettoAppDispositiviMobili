import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';


import {HttpModule} from '@angular/http';
import {IonicStorageModule} from '@ionic/storage';

//My Modules
import {DictionaryModule} from '../modules/dictionary/dictionary.module'

//Native Plugins
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

//Providers
import {AccountProvider} from '../providers/account.provider';
import {UserPersistanceProvider} from '../providers/user-persistance.provider';
import {TaskProvider} from '../providers/task.provider';

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        HttpModule,
        DictionaryModule,
        IonicStorageModule.forRoot({
            name: '__todo_list_lezione',
        }),
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AccountProvider,
        UserPersistanceProvider,
        TaskProvider
    ]
})
export class AppModule {}
