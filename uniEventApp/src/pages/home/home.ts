import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BaseSearchForm } from '../../models/base.sear.form.model';
import { Category } from '../../models/category.model';
import { Event } from '../../models/event.model';
import { CategoryService } from '../../services/category.service';
import { EventService } from '../../services/event.service';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  baseForm: BaseSearchForm = { what: "", when: null, where: "" };

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

    if(this.navParams.get('baseForm') != null){

      this.baseForm = this.navParams.get('baseForm')
    }

    if( this.baseForm.what != "" || this.baseForm.when != null || this.baseForm.where!="" ){

      console.log('ho trovato parametro di ricerca base');

      this.eventService.baseSearch(this.baseForm).subscribe((data: Array<Event>) => {
        this.eventi = data;
      });


    }else{

      console.log('non ho trovato nessun parametro di ricerca base');

      this.eventService.listHotEvent().subscribe((data: Array<Event>) => {
        this.eventi = data;
      });
    }

    this.eventService.listCities().subscribe((data: Array<String>) => {
      this.citta = data;
    });

    this.categoryService.categories().subscribe((data: Array<Category>) => {
      this.categorie = data;
    });

  }




  //metodo che risponde alla form di ricerca della home
  onBaseSearch(baseSearchForm: NgForm){

      console.log('onBaseSearch HomePage');

      this.navCtrl.push(HomePage, { "baseForm": this.baseForm });

  }


  event(e: Event) {
    this.navCtrl.push('DettaglioEventoPage', { eventoId: e.id});
  }

  bottone(){
    this.eventService.listHotEvent();
  }

}
