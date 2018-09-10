import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Register } from "../../models/register.model";
import { User } from "../../models/user.model";
import {UserService} from "../../services/user.service";

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService) {
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
    let digits = this.phoneNUmber.toString().replace(/\D/g, "");
    if (this.phoneRe.test(digits)){
      this.user.telephoneNumber=this.phoneNUmber;
    }
    else{
      // erroe
    }
    //numero

    if (registerForm.valid) {

      console.log("form valida");
      this.userService.register(this.user);
    }
  }

}
