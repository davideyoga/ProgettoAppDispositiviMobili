import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';

import { BaseSearchForm } from '../../models/base.sear.form.model';
import { Category } from '../../models/category.model';
import { Event } from '../../models/event.model';
import { CategoryService } from '../../services/category.service';
import { EventService } from '../../services/event.service';
import { NgForm } from '@angular/forms';
import { PopoverComponent} from "../../components/popover/popover";
import { SearchpopoverComponent } from "../../components/searchpopover/searchpopover";
import { PopoverController} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('mySlider') slider: Slides;

  public isSearchBarOpened = false;
  public evento:any = [{id: 1, utente: 'cristiano', titolo: 'trattorissimo', date: "11/08/2016", imm: 10, ind: 'Via Roma, 50, 67019, Scoppito Avenue'},
                       {id: 2, utente: 'Cristiano1', titolo: 'titolo evento1',date: "16/12/2018", imm: 20}
                      ];


  baseForm: BaseSearchForm = { what: "", when: "", where: ""};

  //lista di eventi visualizzabili nella home
  eventi: Array<Event>;

  //lista citta' salvate nel db
  citta: Array<String>;

  //lista di categorie
  categorie: Array<Category>;

  // selectedSegment: string;
  // slides: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService,
              private categoryService: CategoryService, public popOverCtrl: PopoverController) {

    // this.selectedSegment = 'first';
    // this.slides = [
    //   {
    //     id: "first",
    //     title: "First Slide"
    //   },
    //   {
    //     id: "second",
    //     title: "Second Slide"
    //   },
    //   {
    //     id: "third",
    //     title: "Third Slide"
    //   }
    // ];
  }

  //tutto cio' che succede all'avvio della pagina
  ionViewDidLoad() {

    console.log('ionViewDidLoad HomePage', this.evento);

      if(this.navParams.get('baseForm') != null){

        this.baseForm = this.navParams.get('baseForm')
      }

      if( this.baseForm.what != "" || this.baseForm.when != "" || this.baseForm.where!="" ){

        console.log('ho trovato parametro di ricerca base');

        console.log('this.baseForm.what: '+this.baseForm.what);
        console.log('this.baseForm.when: '+this.baseForm.when);
        console.log('this.baseForm.where: '+this.baseForm.where);

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
        console.log(this.baseForm)


        this.navCtrl.push(HomePage, {"baseForm": this.baseForm });

    }


    event(e: Event) {
      this.navCtrl.push('DettaglioEventoPage', { eventoId: e.id});
    }

    bottone(){
      this.eventService.listHotEvent();
    }


  //per debug
  onSearch(event){
    console.log(event.target.value);
  }

  presentPopover(event){
    let popover = this.popOverCtrl.create(PopoverComponent);
    popover.present({
      ev: event
    });

    popover.onDidDismiss(popoverData => {
      console.log(popoverData)
    });
  }

  // onSegmentChanged(segmentButton) {
  //   console.log("Segment changed to", segmentButton.value);
  //   const selectedIndex = this.slides.findIndex((slide) => {
  //     return slide.id === segmentButton.value;
  //   });
  //   this.slider.slideTo(selectedIndex);
  // }
  //
  // onSlideChanged(slider) {
  //   console.log('Slide changed');
  //   const currentSlide = this.slides[slider.getActiveIndex()];
  //   this.selectedSegment = currentSlide.id;
  // }
}
