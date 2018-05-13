import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {RestProvider} from '../../providers/rest/rest'

/**
 * Generated class for the EventListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'eventlist',
  templateUrl: 'eventlist.html',
})
export class eventlist {


  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.getUsers();
  }

  users: any;


  getUsers() {
    this.restProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
  }

}

