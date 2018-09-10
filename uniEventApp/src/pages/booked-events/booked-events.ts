import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UTENTE_STORAGE } from '../../constants';
import { User } from '../../models/user.model';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

/**
 * Generated class for the BookedEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booked-events',
  templateUrl: 'booked-events.html',
})
export class BookedEventsPage {

  utente: User;

  eventi: Array<Event>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage, public userService:UserService, public eventService:EventService) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad BookedEventsPage');

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

    //si prende gli eventi prenotati
    this.eventService.getEventPrenotatedByToken(this.userService.getUtenteToken()).subscribe((data: Array<Event>) => {
      this.eventi = data;
    });


  }




}