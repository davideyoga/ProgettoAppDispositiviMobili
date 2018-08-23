import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EXTRAFILTER_PAGE } from '../pages';


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
  
  public types:any = [{tp: 'concerto'},
                      {tp: 'degustazione'},
                      {tp: 'accensione trattori'}];
  
  public services:any = [{sv:'servizio '},
                         {sv:'servizio one'},
                         {sv:'servizio trattori'},
                         {sv:'servizio di ordine'},
                         {sv:'servizietto '}];
  
  servicesArray :any = [];
  rangeArray :any = [];
  sendArray :any = [];
  typeArray :any = [] ;z
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExtrafilterPage');
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
