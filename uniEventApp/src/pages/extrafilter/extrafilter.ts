import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EXTRAFILTER_PAGE, DUMMY_PAGE } from '../pages';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { AdvanceSearchForm } from '../../models/advance.search.model';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { Service } from "../../models/service.model";
import { HomePage } from "../home/home";
import { DummyPage } from "../dummy/dummy";
import { ResultPage } from "../result/result";

@IonicPage()
@Component({
  selector: 'page-extrafilter',
  templateUrl: 'extrafilter.html',
})
export class ExtrafilterPage {

  structure: any = { lower: 33, upper: 60 };

  // so le categorie
  // public types:any = [{tp: 'concerto'},
  //                     {tp: 'degustazione'},
  //                     {tp: 'accensione trattori'}];

  //so i servizi
  // public services:any = [{sv:'servizio '},
  //                        {sv:'servizio one'},
  //                        {sv:'servizio trattori'},
  //                        {sv:'servizio di ordine'},
  //                        {sv:'servizietto '}];

  servicesArray: Array<string> = [];

  //typerArray è per le categorie
  typeArray :any = [] ;
  selectedType: any;

  categorie: Array<Category>;
  servizi: Array<Service>;
  eventi: Array<Event>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private categoryService: CategoryService, private eventService: EventService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExtrafilterPage');

    //caricare le categorie all'apertura della pagina
    this.categoryService.categories().subscribe((data: Array<Category>) => {
      this.categorie = data;
    });

    this.eventService.listService().subscribe( (data: Array<Service>) => {
      this.servizi = data;
      console.log(this.servizi)
    });

  }

  reset(){
    this.navCtrl.push(EXTRAFILTER_PAGE);
  }

  // checkAll(){
  //   for(let i =0; i <= this.services.length; i++) {
  //     this.services[i].checked = true;
  //   }
  //  console.log(this.services);
  // }

  // selectService(data){
  //   if (data.checked == true) {
  //     console.log(data);
  //     this.servicesArray.push(data);
  //   } else {
  //     let newArray = this.servicesArray.filter(function(el) {
  //       return el.sv !== data.sv;
  //     });
  //     this.servicesArray = newArray;
  //   }
  //   console.log(this.servicesArray);
  // }

  selectService2(data: Service){
    //caso di aggiunta
    if (this.servicesArray.indexOf(data.name)==-1)
      this.servicesArray.push(data.name);

    //rimozione
    else{
      let arrayAppoggio: Array<string> =[];
      for(let i=0; i<this.servicesArray.length; i++){
        if (this.servicesArray[i]!=data.name)
          arrayAppoggio.push(this.servicesArray[i]);
      }
      this.servicesArray.length=0;
      this.servicesArray = arrayAppoggio;
    }
    console.log(this.servicesArray);
  }

  //seleziona le categorie
  selectType(data: Category){
    this.selectedType=data.name;
    console.log(this.selectedType);
  }

  research(min:any, max:any){
    console.log('minimo: ' + min);
    console.log('massimo: ' + max);

    //console.log(this.sendArray);

    //var advanceSearch: AdvanceSearchForm = new AdvanceSearchForm();
    //advanceSearchForm: AdvanceSearchForm = { minPrice: 0, maxPrice: 0, category: "", serviceList:[]};

    let advanceSearchForm: AdvanceSearchForm = { minPrice: min, maxPrice: max, category: "", serviceList:[] };

    advanceSearchForm.category = this.selectedType;
    advanceSearchForm.serviceList = this.servicesArray;

    // console.log('advanced min max: '+ advanceSearchForm.minPrice);
    // console.log('advanced min max: '+ advanceSearchForm.maxPrice);
    // console.log('advanced cat: '+ advanceSearchForm.category);
    // console.log('advanced serv: '+ advanceSearchForm.serviceList);

    console.log(advanceSearchForm);

    //SETTARE IN advanceSearchForm category e service

    //chiamata al server
    this.eventService.advanceSearch(advanceSearchForm).subscribe( (data: Array<Event>) => {
      this.eventi=data;
      console.log('stiamo qua');
      console.log(this.eventi);
      this.navCtrl.push(ResultPage, { filteredevents: this.eventi })
    });

  }

}
