import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';

//Models
import {User} from '../../models/user.model';

//Providers
import {AccountProvider} from '../../providers/account.provider';
import {DictionaryService} from '../../modules/dictionary/providers/dictionary.service';

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    
    username: string = "";
    password: string = "";
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public sAccount: AccountProvider,
        public loadingCtrl: LoadingController,
        public sDictionary: DictionaryService
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Login');
    }

    goSignup() {
        this.navCtrl.push('SignupPage');
    }

    login() {
        this._validate().then(() => {
            const loading = this.loadingCtrl.create({ content: this.sDictionary.get("LOADING_WAITING") });
            loading.present();
            
            this.sAccount.login(this.username, this.password)
                .then((user: User) => {
                    console.log("logged: ", user);

                    loading.dismiss().then(() => {
                        this.navCtrl.setRoot('TabsPage');
                    });
                })
                .catch((msg) => {
                    console.log("errore login: non mi sono riuscito a loggare");

                    loading.dismiss().then(() => {
                        this.alertCtrl.create({
                            title: this.sDictionary.get("APP_NAME"),
                            message: msg,
                            buttons: [this.sDictionary.get("OK")]
                        }).present();
                    });
                });
        }).catch(() => {});
    }
    
    
    private _validate() {
        return new Promise((resolve, reject) => {
            let msg = "";
            if (this.username.trim() === "") {
                msg = this.sDictionary.get("WARNING_LOGIN_USERNAME_EMPTY");
            } else if (this.password.trim() === "") {
                msg = this.sDictionary.get("WARNING_LOGIN_PASSWORD_EMPTY");
            }
            
            if (msg !== "") {
                this.alertCtrl.create({
                    title: this.sDictionary.get("APP_NAME"),
                    message: msg,
                    buttons: [this.sDictionary.get("OK")]
                }).present();
                
                reject();
            } else {
                resolve();
            }
        });
    }

}
