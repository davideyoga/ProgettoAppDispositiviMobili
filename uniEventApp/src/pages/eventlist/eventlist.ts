import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Event } from '../../models/event.model';
import { EventProvider } from '../../providers/rest/event.provider';
import { EventService } from '../../services/event.service';
import { HomePage } from '../home/home';
import { BaseSearchForm } from '../../models/base.sear.form.model';


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
  baseForm: BaseSearchForm;

  events: Array<Event> = [];

  constructor(
    public navCtrl: NavController,
    public sEvents: EventProvider,
    public eventService: EventService
  )
    {
      this.sEvents.getEvents()
      .then(events => {
          this.events = events;
          console.log(this.events);
      });
    }



  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    
    this.eventService.listHotEvent().subscribe((data: Array<Event>) => {
      this.events = data;
    });
  }

//metodo che risponde alla form di ricerca della home
onBaseSearch(baseSearchForm: BaseSearchForm){

  console.log('onBaseSearch HomePage');

  this.navCtrl.push(HomePage, { "baseForm": baseSearchForm });

}

}

