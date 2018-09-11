import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';

import { BaseSearchForm } from '../../models/base.sear.form.model';
import { Category } from '../../models/category.model';
import { Event } from '../../models/event.model';
import { CategoryService } from '../../services/category.service';
import { EventService } from '../../services/event.service';
import { NgForm } from '@angular/forms';
import { PopoverComponent} from "../../components/popover/popover";
import { PopoverController} from "ionic-angular";
import { EXTRAFILTER_PAGE } from '../pages';
import { Content } from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {SocialSharing} from "@ionic-native/social-sharing";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('mySlider') slider: Slides;
  @ViewChild(Content) content: Content;

  public isSearchBarOpened = false;
  // public evento:any = [
  //   {id: 1, price:'10', utente: 'cristiano', titolo: 'trattorissimo', date: "11/08/2016", imm: 10},
  //   {id: 2, utente: 'Cristiano1',price:'20' ,titolo: 'titolo evento1', date: "16/12/2018", imm: 20}
  // ];
  
  

  max: number = 0;


  baseForm: BaseSearchForm = { what: "", when: "", where: ""};

  //lista di eventi visualizzabili nella home
  eventi: Array<Event>;
  eventiFav: Array<Event>;

  //lista citta' salvate nel db
  citta: Array<String>;

  //lista di categorie
  categorie: Array<Category>;


  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventService,
              private categoryService: CategoryService, public popOverCtrl: PopoverController,
              public userService: UserService, private socialSharing: SocialSharing) {};

  //tutto cio' che succede all'avvio della pagina
  ionViewDidLoad() {

    this.eventService.favoriteEvent(this.userService.getUtenteToken()).subscribe((data: Array<Event>) => {
      this.eventiFav = data;
      console.log(this.eventiFav);
    });

    console.log('ionViewDidLoad HomePage' + this.eventi);

    if(this.navParams.get('baseForm') != null){

      this.baseForm = this.navParams.get('baseForm')
    }

    if( this.baseForm.what != "" || this.baseForm.when != "" || this.baseForm.where!="" ){
      //attenzione gestire singoli campi nulli

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
    // this.maxprice();
  }

//   maxprice(){
//     // if(this.eventi.length>0){
//     //   for (let entry of this.eventi) {
//     //     if(entry.price > this.max){
//     //       this.max = entry.price;
//     //     }
//     // }
//     // if(this.eventiFav.length>0){
//     //   for (let entry of this.eventiFav) {
//     //     if(entry.price > this.max){
//     //       this.max = entry.price;
//     //     }
//     // }
//     // }
//     // if(this.evento.length>0){
//       for (let entry of this.eventi) {
//         if(entry.price > this.max){
//           this.max = entry.price;
//         }
//     // }
//     console.log(this.max);
//   }
// }
// // }


  //metodo che risponde alla form di ricerca della home
  onBaseSearch(baseSearchForm: NgForm){


    console.log('onBaseSearch HomePage');
    console.log(this.baseForm)


    this.navCtrl.setRoot(HomePage, {"baseForm": this.baseForm });

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

  goExtra(){
    this.navCtrl.push(EXTRAFILTER_PAGE);
  }

  scrollToTop(){
    this.content.scrollToTop();
  }

  setFavorite(e: Event){
    let token= this.userService.getUtenteToken();
    this.userService.addUserFavorite(token, e.id).subscribe((data: boolean) => {
      console.log('favorite event');
      console.log(data);
    });
  }

  unsetFavorite(e: Event){
    let token= this.userService.getUtenteToken();
    this.userService.removeUserFavorite(token, e.id).subscribe((data: boolean) => {
      console.log('remove favorite event');
      console.log(data);
    });
  }

  share(e: Event){
    this.socialSharing.share(e.id.toString())
      .then(() =>{

      }).catch(() => {

    });
  }

}
