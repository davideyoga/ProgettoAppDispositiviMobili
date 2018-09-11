import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, Events, AlertController, ToastController } from 'ionic-angular';

import { User} from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Login } from '../../models/login.model';
import { HttpErrorResponse } from '@angular/common/http';
import { EVENTI_PAGE, REGISTER_PAGE } from '../pages';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: User = { id: 0,
    name: "",
    surname: "",
    email: "prova",
    age: 0,
    address: "",
    telephoneNumber: 0,
    password: "prova"};



  login: Login=null;
  loginTitle: string;
  loginSubTitle: string;


  constructor(public alertCtrl: AlertController, public events: Events, public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService,
                  private userService: UserService,private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.translateService.get('LOGIN_ERROR_SUB_TITLE').subscribe((data) => {
      this.loginSubTitle = data;
    });
    this.translateService.get('LOGIN_ERROR_TITLE').subscribe((data) => {
      this.loginTitle = data;
    });
  }

  onLogin(loginForm:NgForm){

    console.log('lanciato metodo onLogin');
    console.log("email: " + this.user.email);
    console.log("password: " + this.user.password);



    if (loginForm.valid) {

      console.log("form valida");

      this.userService.login(this.user).subscribe((data: Login) => {

        //se username e login sono corretti
        if(data != null){

          //setto l'oggetto login
          this.login = data;
          this.events.publish('user:login', this.user);

          console.log("Login effettuato");
          console.log(this.user);

          this.navCtrl.setRoot(EVENTI_PAGE);


        //se username e password non corretti
        }else{
          console.log("Login non effettuato");
        }

      });

    }
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Login successful',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  goRegister(){
    this.navCtrl.push(REGISTER_PAGE);
  }

}
