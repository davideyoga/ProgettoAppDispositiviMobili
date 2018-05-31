import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

import {EventProvider} from '../../providers/rest/event.provider'

import {Event} from '../../models/event.model';

import { EventService, BaseSearchForm } from '../../service/evento.service';

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

  baseForm: BaseSearchForm = {what: null, when: "", where: ""};

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

  onBaseSearch(b: BaseSearchForm){
    console.log('onBaseSearch HomePage');

    this.eventService.events().subscribe((data: Array<Event>) => {
      this.eventi = data;
    });
  }

}

