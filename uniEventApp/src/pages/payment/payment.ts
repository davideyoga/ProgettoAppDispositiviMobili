import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Event} from "../../models/event.model";
import { EventService } from '../../services/event.service';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  evento:Event;
  creatore:User;
  qta: number= 1;
  total: number= 0;
  priceFlag: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService,
              public eventService: EventService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');

    this.eventService.findById(this.navParams.data.eventoId).subscribe((data: Event) => {

      this.evento = data;
      if (this.evento.price!=null){
        console.log(this.evento.price);
        this.priceFlag=true;
        this.total=this.evento.price;
      }
      else {
        console.log(this.evento.price + "no prezzo");
        this.priceFlag=false;
        this.total=0;
      }

      console.log(this.evento.title);
      this.userService.getUserCreatedEvent(this.evento.id).subscribe((data: User) => {
        this.creatore = data;
        this.creatore.name = this.creatore.name.charAt(0).toUpperCase() + this.creatore.name.slice(1);
        console.log(this.creatore.id);
      });

    });

  }

  openCreator(){
    this.navCtrl.push('EventCreatorPage', {user: this.creatore});
  }

  changeTotal(){
    this.total=this.evento.price*this.qta;
    console.log(this.total);
  }

  prenota(){
    this.eventService.bookedEvent(this.userService.getUtenteToken(),this.evento.id).subscribe((data:boolean) =>
    {
      console.log("data in payment: " + data);

});
}



}
