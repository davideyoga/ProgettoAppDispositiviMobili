import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { Category } from '../../models/category.model';

@IonicPage()
@Component({
  selector: 'page-myevents',
  templateUrl: 'myevents.html',
})
export class MyeventsPage {

  //lista di eventi visualizzabili nella home
  eventi: Array<Event>;

  //lista citta' salvate nel db
  citta: Array<String>;

  //lista di categorie
  categorie: Array<Category>;

  utenteid: number = 1; //per ora è statico, poi si prende da db

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyeventsPage');

  this.eventService.getEventByUserCreator(this.utenteid).subscribe((data: Array<Event>) => {
      this.eventi = data;
    });
  }

  event(e: Event) {
    this.navCtrl.push('DettaglioEventoPage', { eventoId: e.id});
  }


}
