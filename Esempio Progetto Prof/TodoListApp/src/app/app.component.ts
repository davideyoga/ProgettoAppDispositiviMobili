import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

//Providers
import {AccountProvider} from '../providers/account.provider';
import {DictionaryService} from '../modules/dictionary/providers/dictionary.service';

@Component({
    templateUrl: 'app.html',
    providers: [DictionaryService]
})
export class MyApp {
    rootPage: any;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        sAccount: AccountProvider,
        sDictionary: DictionaryService
    ) {
        platform.ready().then(() => {
            let promises = [] as Promise<any>[];
            promises.push(sDictionary.load());
            promises.push(sAccount.initialize());

            Promise.all(promises).then(() => {
                if (sAccount.isLogged()) {
                    this.rootPage = 'TabsPage';
                } else {
                    this.rootPage = 'LoginPage';
                }
            });

            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}

