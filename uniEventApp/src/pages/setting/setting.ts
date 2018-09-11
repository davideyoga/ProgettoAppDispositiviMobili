import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LinguaService, Lingua } from '../../services/lingua.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';


@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  utente: User;
  lingue: Array<Lingua>;
  english:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService,
    public linguaService: LinguaService, public translateService: TranslateService,private viewCtrl: ViewController, private zone:NgZone) {}

  ionViewDidLoad() {

    console.log("ionViewDidLoad SettingPage");
    this.linguaService.getLinguaAttuale().subscribe((lingua: string) => {
      if(lingua==="en") this.english=true;
      else if(lingua==="it") this.english=false;
    });

  }

  ionViewDidEnter() {

    this.linguaService.getLinguaAttuale().subscribe((lingua: string) => {
      if(lingua==="en") this.english=true;
      else if(lingua==="it") this.english=false;
    });
  }


  cambiaLingua(){
    let linguaScelta;
      if (this.english===true){ linguaScelta="en"}
      else if (this.english===false){ linguaScelta="it"}


      console.log("la lingua scelta è " + linguaScelta);
      this.translateService.use(linguaScelta);
      this.linguaService.updateLingua(linguaScelta);


    }
  }

