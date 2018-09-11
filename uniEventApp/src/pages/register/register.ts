import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

import { Login } from '../../models/login.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { EVENTI_PAGE } from '../pages';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  valid: boolean = false;
  re: any = /\S+@\S+\.\S+/;
  phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  user: User = {  id: 0,
    name: "",
    surname: "",
    email: "",
    age: 0,
    address: "",
    telephoneNumber: 0,
    password: ""};

  phoneNUmber: number =0;
  email: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService,
              public alertCtrl: AlertController, public events: Events ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(registerForm:NgForm){
    console.log('lanciato metodo register');
    console.log("email: " + this.user.email);
    console.log("password: " + this.user.password);

    // email
    if (this.re.test(this.user.email)) {
      console.log('email valida');
    }
    else {
      this.user.email="";
      console.log('email non valida');
    }

    console.log("email: " + this.user.email);
    //email

    //numero
    /*
    let digits = this.phoneNUmber.toString().replace(/\D/g, "");
    if (this.phoneRe.test(digits)){
      this.user.telephoneNumber=this.phoneNUmber;
    }
    else{
      // erroe
    }
    //numero*/

    if (registerForm.valid) {

      console.log("form valida");

      this.userService.register(this.user.email, this.user.password).subscribe((data: User) => {
        //data e' un oggetto di tipo login
        console.log("data.email: " + data.email);
        console.log("data.id: " + data.id);

        if(data.email == null){
          console.log("email gia presente");

          this.doAlert();

        }else{
          console.log("utente creato, la sua mail e': " + data.email);

          this.userService.login(data).subscribe((data: Login) => {

            console.log("login effettuata, login.token: " + data.token);

            this.events.publish('user:login', this.user);

            console.log("login:");
            console.log(data);

            //una volta effettuata la login rimanda alla pagina centrale
            this.navCtrl.setRoot(EVENTI_PAGE);

          });
        }
      });

    }
  }

  doAlert() {
    let alert = this.alertCtrl.create({
      title: 'Existing Email',
      subTitle: 'the email entered is already present in the system',
      buttons: ['Ok']
    });

    alert.present();
  }

  checkMail(){
    // email
    if (this.re.test(this.user.email)) {
      console.log('email valida');
      this.valid=true;

    }
    else {
      this.valid=false;
      console.log('email non valida');
    }
  }

}
