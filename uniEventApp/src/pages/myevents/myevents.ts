import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { Category } from '../../models/category.model';
import { CREATEVENTS_PAGE } from '../pages';
import { UTENTE_STORAGE } from '../../constants';
import { User } from '../../models/user.model';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-myevents',
  templateUrl: 'myevents.html',
})
export class MyeventsPage {


  utente:User;

  //lista di eventi visualizzabili nella home
  eventi: Array<Event>;

  //lista citta' salvate nel db
  citta: Array<String>;

  //lista di categorie
  categorie: Array<Category>;

  // utenteid: number = this.storage.get(UTENTE_STORAGE).then((user) => {
  //
  //   this.utente=user;
  //
  //   console.log(this.utente);
  //   if (this.utente== null){
  //     this.utente={  id: 0,
  //       name: "",
  //       surname: "",
  //       email: "",
  //       age: 0,
  //       address: "",
  //       telephoneNumber: 0,
  //       password: ""};
  //   }
  // });

  public evento:any = [{id: 1, utente: 'cristiano', title: 'trattorissimo', date: "11/08/2016", imm: 10, ind: 'Via Roma, 50, 67019, Scoppito Avenue'},
    {id: 2, utente: 'Cristiano1', title: 'titolo evento1',date: "16/12/2018", imm: 20}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService,
              public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyeventsPage');

    this.storage.get(UTENTE_STORAGE).then((user) => {

      this.utente=user;
      if (this.utente == null){
        this.utente={id:1,
          name: "",
          surname: "",
          email: "",
          age: 0,
          address: "",
          telephoneNumber: 0,
          password: ""};
      }
    });


    console.log(this.utente.id);

    this.eventService.getEventByUserCreator(this.utente.id).subscribe((data: Array<Event>) => {
      this.eventi = data;
    });
  }

  event(e: Event) {
    this.navCtrl.push('DettaglioEventoPage', { eventoId: e.id});
  }

  createevent(){
    this.navCtrl.push(CREATEVENTS_PAGE);

  }
}
