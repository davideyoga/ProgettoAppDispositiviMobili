import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';

import { MenuController, Nav, Platform } from 'ionic-angular';

import { LinguaService } from '../services/lingua.service';
import { EVENTI_PAGE, LOGIN_PAGE, PROFILE_PAGE, DUMMY_PAGE, MYEVENTS_PAGE, FAVORITE_PAGE } from '../pages/pages';

import {timer} from 'rxjs/observable/timer';
import { UserService } from '../services/user.service';
import { Events } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav:Nav;

  rootPage:any;

  loggedIn = false;

  menuL: Array<{title: string, component: any, icon:any}>;

  menuNL: Array<{title: string, component: any, icon:any}>;  //menu non loggato

  showSplash = true;




  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menu: MenuController,
  private linguaService: LinguaService, private translate: TranslateService, private UserService: UserService, public events: Events) {



    this.menuL = [

      //temporanei sopra
      {title: 'LISTA_EVENTI_MENU', component: EVENTI_PAGE, icon: 'calendar' },
      {title: 'PREFERITI_MENU', component: FAVORITE_PAGE, icon: 'heart' },
      {title: 'EVENTI_CREATI_MENU', component: MYEVENTS_PAGE, icon: 'add' },
      {title: 'EVENTI_PRENOTATI_MENU', component: DUMMY_PAGE, icon: 'checkmark-circle-outline' }
    ];

    this.menuNL = [
      {title: 'Login', component: LOGIN_PAGE, icon:''},

      //temporanei sopra
      {title: 'LISTA_EVENTI_MENU', component: EVENTI_PAGE, icon: 'calendar' },

    ];

    console.log("constructor MyApp");

    //chiama metodo initTranslate
    this.initTranslate();
    platform.ready().then(() => {
      //QUI CAMBIO LA ROOT PAGE
      this.rootPage = EVENTI_PAGE;

      this.listenToLoginEvents(); //guarda sotto

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();
      timer(4000).subscribe(()=> this.showSplash = false)
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

  openProfile(){
    this.nav.setRoot(PROFILE_PAGE);
  }

  openSettings(){
  this.nav.setRoot(DUMMY_PAGE)} //da sostituire

  login(){
    this.nav.setRoot(LOGIN_PAGE)}

    logout(){
      this.UserService.logout();
      console.log("logout effettuato");}



      listenToLoginEvents() {
        this.events.subscribe('user:login', () => {
          this.loggedIn = true;
        });

        this.events.subscribe('user:logout', () => {
          this.loggedIn = false;
        });
      }

}
