import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  public types:any = [{tp: 'concerto'},{tp: 'degustazione'},{tp: 'accensione trattori'}];
  public services:any = [{sv:'servizio '},
                         {sv:'servizio one'},
                         {sv:'servizio trattori'},
                         {sv:'servizio sboldre'},
                         {sv:'servizietto '}];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExtrafilterPage');
  }
  
  reset(){
    // this.extrafilter.reset()
  }
  
}
