import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Event } from '../../models/event.model';
import { User } from '../../models/user.model';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';



@IonicPage()
@Component({
  selector: 'page-dettaglio-evento',
  templateUrl: 'dettaglio-evento.html',
})
export class DettaglioEventoPage {

  evento:Event;
  creatore:User;


  constructor(public navCtrl: NavController, public navParams: NavParams, public eventService: EventService,
                public userService: UserService) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad DettaglioNotiziaPage');
    
    this.eventService.findById(this.navParams.data.eventoId).subscribe((data: Event) => {
      
      this.evento = data;

      this.userService.getUserCreatedEvent(this.evento.id).subscribe((data: User) => {
        this.creatore = data;
      });

    });

  }

  // ionViewDidLeave() {
  //   console.log('ionViewDidLeave DettaglioEventoPage');
  //   //Inserito perche' se l'utente va in un altro tab (es. esami), e ritorna nel tab esami rimane aperta questa vista
  //   this.navCtrl.popToRoot();
  // }

  infoUser(){

    this.navCtrl.push('EventCreatorPage', { user: this.creatore })

  }

}
