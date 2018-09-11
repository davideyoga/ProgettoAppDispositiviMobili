import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  linguaPreferita: string;
  lingue: Array<Lingua>;
  english:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService,
    public linguaService: LinguaService, public translateService: TranslateService) {}

  ionViewDidLoad() {

    console.log("ionViewDidLoad SettingPage");
    this.lingue = this.linguaService.getLingue();
    this.linguaService.getLinguaAttuale().subscribe((lingua: string) => {
      this.linguaPreferita = lingua;
      if(lingua=="en") this.english=true;
      else this.english=false;
    });
    this.userService.getUtente().subscribe((utente: User) => {
      this.utente = utente;
    });

  }

  cambiaLingua() {

      if (this.english==true) this.linguaPreferita="en";
      else this.linguaPreferita="it";
      this.translateService.use(this.linguaPreferita);
      this.linguaService.updateLingua(this.linguaPreferita);

    }
  }

