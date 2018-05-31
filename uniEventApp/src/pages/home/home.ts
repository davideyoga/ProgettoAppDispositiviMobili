import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Event } from '../../models/event.model';
import { BaseSearchForm, EventService } from '../../services/event.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  baseForm: BaseSearchForm = {what: null, when: "", where: ""};
  
  //lista di eventi visualizzabili nella home 
  eventi: Array<Event>

  //lista citta' salvate nel db
  citta: Array<String>

  //lista di categorie
  categorie: Array<Category>



  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService,
                private categoryService: CategoryService) {
  }


  //tutto cio' che succede all'avvio della pagina 
  ionViewDidLoad() {

    console.log('ionViewDidLoad HomePage');
    
    this.eventService.listHotEvent().subscribe((data: Array<Event>) => {
      this.eventi = data;
    });

    this.eventService.listCities().subscribe((data: Array<String>) => {
      this.citta = data;
    });

    this.categoryService.categories().subscribe((data: Array<Category>) => {
      this.categorie = data;
    });

  }




  onBaseSearch(b: BaseSearchForm){
    console.log('onBaseSearch HomePage');

    this.eventService.events().subscribe((data: Array<Event>) => {
      this.eventi = data;
    });
  }


  event(e: Event) {
    this.navCtrl.push('DettaglioEvento',{ eventoId: e.id});
  }

  bottone(){
    this.eventService.listHotEvent();
  }

}
