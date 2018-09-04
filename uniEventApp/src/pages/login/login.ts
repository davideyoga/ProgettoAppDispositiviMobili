import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';

import { User,Account } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Login } from '../../models/login.model';
import { HttpErrorResponse } from '@angular/common/http';

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
    email: "pippo",
    age: 0,
    address: "",
    telephoneNumber: 0,
    password: "pippo"};



  login: Login=null;
  loginTitle: string;
  loginSubTitle: string;


  constructor(public alertCtrl: AlertController, public events: Events, public navCtrl: NavController, public navParams: NavParams, public translateService: TranslateService,
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

  onLogin(loginForm:NgForm){

    console.log('lanciato metodo onLogin');
    console.log("email: " + this.user.email);
    console.log("password: " + this.user.password);

    if (loginForm.valid) {

      console.log("form valida");


      //eseguo la chiamata al server
      this.userService.login(this.user).subscribe((data: Login) => {
        
        //setto l'oggetto login
        this.login = data;

      if(this.login!=null){
        

    }else{
      console.log("error");
    }
      })


    console.log('login:' + this.login);
  }
  //se form non valida
  else
  console.log("form invalida");

}

}
