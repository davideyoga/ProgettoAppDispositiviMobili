import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DUMMY_PAGE, PROFILE_EDIT_PAGE} from '../pages';
import {UTENTE_STORAGE} from "../../constants";
import {User} from "../../models/user.model";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  utente: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {}


ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    this.storage.get(UTENTE_STORAGE).then((user) => {

      this.utente=user;
      console.log(this.utente);
      if (this.utente == null){
        this.utente={ id: 0,
          name: "",
          surname: "",
          email: "",
          age: 0,
          address: "",
          telephoneNumber: 0,
          password: ""};
      }
    })
  }

modifyProfile(){
  this.navCtrl.push(PROFILE_EDIT_PAGE);
}

openSettings(){
  this.navCtrl.push(DUMMY_PAGE);
}

openPastEvents(){
  this.navCtrl.push(DUMMY_PAGE);
}

openHelp(){
  this.navCtrl.push(DUMMY_PAGE);
}

openFeed(){
  this.navCtrl.push(DUMMY_PAGE);
}



}
