import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';


/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private userService: UserService, private eventService: EventService) {
  }

  ionViewDidLoad() {
    
    let token = this.userService.getUtenteToken();

    
    this.eventService.favoriteEvent(token).subscribe((data: Array<Event>) => {

      console.log("data: " + data);
      this.event = data;
      
    });


    this.userService.register(this.user.email, this.user.password).subscribe((data: Login) => {
      //data e' un oggetto di tipo login
      console.log("data.user: " + data.user.email);
    });


  }

}
