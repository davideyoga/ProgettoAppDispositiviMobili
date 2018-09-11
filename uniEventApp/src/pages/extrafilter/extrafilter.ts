import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EXTRAFILTER_PAGE } from '../pages';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { AdvanceSearchForm } from '../../models/advance.search.model';
import { EventService } from '../../services/event.service';
import {Event} from '../../models/event.model';
import {Service} from "../../models/service.model";


/**
* Generated class for the ExtrafilterPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-extrafilter',
  templateUrl: 'extrafilter.html',
})
export class ExtrafilterPage {

  structure: any = { lower: 33, upper: 60 };

  servicesArray :any = [];
  rangeArray :any = [];
  sendArray :any = [];
  typeArray :any = [] ;

  categorie: Array<Category>;
  eventi: Array<Event>;


  

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private categoryService: CategoryService, private eventService: EventService) {


  }

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


  research(min:any, max:any){
    // console.log('minimo: ',min);
    // console.log('massimo: ',max);
    // console.log(this.typeArray);
    // console.log(this.selectedArray);
    this.sendArray.length = 0;
    this.rangeArray.length = 0;
    this.rangeArray.push(min);
    this.rangeArray.push(max);
    this.sendArray.push(this.rangeArray);
    this.sendArray.push(this.servicesArray);
    this.sendArray.push(this.typeArray);

    console.log(this.sendArray);

    //var advanceSearch: AdvanceSearchForm = new AdvanceSearchForm();
    //advanceSearchForm: AdvanceSearchForm = { minPrice: 0, maxPrice: 0, category: "", serviceList:[]};

    var advanceSearchForm: AdvanceSearchForm = { minPrice: min, maxPrice: max, category: "", serviceList:[] };

    //SETTARE IN advanceSearchForm category e service 

    //chiamata al server
    this.eventService.advanceSearch(advanceSearchForm).subscribe( (data: Array<Event>) => {
      //vedere cosa fare con gli eventi che tornano
    });

  }

  selectService(data){
    if (data.checked == true) {
      this.servicesArray.push(data);
    } else {
      let newArray = this.servicesArray.filter(function(el) {
        return el.sv !== data.sv;
      });
      this.servicesArray = newArray;
    }
    //console.log(this.servicesArray);
  }

  selectType(data){
    this.typeArray.length = 0;
    this.typeArray.push(data);
    //console.log(this.typeArray);
  }

}
