import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

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

  eventi: Array<Event>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private eventService: EventService) {
  }

  ionViewDidLoad() {

    this.eventService.favoriteEvent(this.userService.getUtenteToken()).subscribe((data: Array<Event>) => {
      this.eventi = data;
    });

  }


  UnSetFavorite(e: Event){
    let token= this.userService.getUtenteToken();
    this.userService.removeUserFavorite(token, e.id).subscribe((data: boolean) => {
      console.log('unsetfavorite event');
      console.log(data);
    });
  }

}
