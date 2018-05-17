import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

import {EventProvider} from '../../providers/rest/event.provider'

import {Event} from '../../models/event.model';

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

  events: Array<Event> = [];

  constructor(
    public navCtrl: NavController,
    public sEvents: EventProvider
  )
    {
      this.sEvents.getEvents()
      .then(events => {
          this.events = events;
          console.log(this.events);
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
  }

}

