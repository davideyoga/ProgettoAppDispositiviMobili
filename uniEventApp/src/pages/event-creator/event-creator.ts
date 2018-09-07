import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { User } from '../../models/user.model';
import { Event } from '../../models/event.model';
import { EventService } from '../../services/event.service';


@IonicPage()
@Component({
  selector: 'page-event-creator',
  templateUrl: 'event-creator.html',
})
export class EventCreatorPage {

  verified: boolean= false;
  user: User;
  listEvent: Array<Event>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventService: EventService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCreatorPage');

    this.user = this.navParams.data.user;

    this.eventService.getEventByUserCreator(this.user.id).subscribe((data: Array<Event>) => {
      this.listEvent = data;
    });   

  }

  eventSelected(event : Event){

    this.navCtrl.push('DettaglioEventoPage', { eventoId: event.id});

  }

}
