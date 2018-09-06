import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Register } from "../../models/register.model";
import { User } from "../../models/user.model";

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

  user: User = {  id: 0,
    name: "",
    surname: "",
    email: "",
    age: 0,
    address: "",
    telephoneNumber: 0,
    password: ""};


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(registerForm:NgForm){
    console.log('lanciato metodo onLogin');
    console.log("email: " + this.user.email);
    console.log("password: " + this.user.password);



    if (registerForm.valid) {

      console.log("form valida");

    }
  }
}
