import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';

import {Event} from '../../models/event.model';

import {EventService, BaseSearchForm} from '../../services/event.service';

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

  eventi: Array<Event>;
  baseForm: BaseSearchForm = {what: null, when: "", where: ""};

  events: Array<Event> = [];

  constructor(public navCtrl: NavController, private eventService: EventService){
  }

  ionViewDidLoad() {
    this.eventService.events().subscribe((data: Array<Event>) => {
      this.eventi = data;
    });
  }

}

