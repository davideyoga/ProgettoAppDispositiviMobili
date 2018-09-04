import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalevdescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalevdescription',
  templateUrl: 'modalevdescription.html',
})
export class ModalevdescriptionPage {

  detail = 'invalid';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalevdescriptionPage');
    console.log(this.navParams.get('detail'));
    this.detail=this.navParams.get('detail');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
