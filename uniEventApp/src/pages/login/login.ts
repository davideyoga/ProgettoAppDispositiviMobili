import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Login } from '../../models/login.model';

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
  user: User = {  id: 0,
                  name: "",
                  surname: "",
                  email: "",
                  age: 0,
                  address: "",
                  telephoneNumber: 0,
                  password: ""};



  login: Login = null;
  loginTitle: string;
  loginSubTitle: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService,
                  private userService: UserService) {
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
  
  onLogin(form:NgForm){

    console.log('lanciato metodo onLogin');

    this.user.email = this.navParams.get('user.email');
    this.user.password = this.navParams.get('user.password');

    console.log("password: " + this.user.password);
    console.log("email: " + this.user.email);

    this.userService.login(this.user);

    this.userService.login(this.user).subscribe((data: Login) => {
      this.login = data;
    });

    console.log('login: ' + this.login);

    if(this.login!=null){
      //mandalo allo home
    }else{
      //messaggio errore
    }
  }

}
