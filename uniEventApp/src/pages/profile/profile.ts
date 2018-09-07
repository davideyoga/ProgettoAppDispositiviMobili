import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DUMMY_PAGE, PROFILE_EDIT_PAGE} from '../pages';

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



  constructor(public navCtrl: NavController, public navParams: NavParams) {}


ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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
