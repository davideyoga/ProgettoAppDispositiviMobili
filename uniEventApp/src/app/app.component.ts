import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';

import { AlertController, Events, MenuController, Nav, Platform } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LinguaService } from '../services/lingua.service';
import { EVENTI_PAGE, LOGIN_PAGE, PROFILE_PAGE } from '../pages/pages';



@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav:Nav;

  rootPage:any;

  menuL: Array<{title: string, component: any, icon:any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menu: MenuController,
  private linguaService: LinguaService, private translate: TranslateService) {


    this.menuL = [
      {title: 'Lista Eventi', component: EVENTI_PAGE, icon: '' },
      {title: 'Login', component: LOGIN_PAGE, icon:''},
      {title: 'Profile', component: PROFILE_PAGE, icon:''}
    ];

    console.log("constructor MyApp");

    //chiama metodo initTranslate
    this.initTranslate();
    platform.ready().then(() => {

      this.rootPage = EVENTI_PAGE;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }




  initTranslate() {
    //torna la stringa 'italiano'
    let linguaPreferita = this.linguaService.getLinguaPreferita();

    //setta 'italiano'
    this.translate.setDefaultLang(linguaPreferita);

    // this.linguaService.getLinguaAttuale() torna un Observable,
    // tale oggetto osserva l'avvenire di un evento, in questo
    // caso l'osservatore osserva il ritorno del dato dallo storage,
    // che in questo caso e' la stringa che identifica la lingua scelta dall'utente
    // mi sottoscrivo con subscrive a tale observable, quando torna il dato lingua di tipo stringa:
    this.linguaService.getLinguaAttuale().subscribe((lingua: string) => {

      //se la lingua e' presente nello storage si usa quella
      if (lingua != null) {
        this.translate.use(lingua);

        //altrimenti
      } else {
        // se non e' presente si usa la linguaPreferita che e' impostata di default in ita
        this.translate.use(linguaPreferita);
        // si salva la lingua nello storage
        this.linguaService.updateLingua(linguaPreferita);
      }
    });

    //Bisognerebbe settarlo anche quando si cambia la lingua
    /*
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
    */
  }



  openPage(page){
    this.nav.setRoot(page.component);
  }

}

