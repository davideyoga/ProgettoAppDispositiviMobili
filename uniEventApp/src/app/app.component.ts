import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';

import { MenuController, Nav, Platform, ActionSheetController, AlertController } from 'ionic-angular';

import { LinguaService } from '../services/lingua.service';
import { EVENTI_PAGE, LOGIN_PAGE, PROFILE_PAGE, MYEVENTS_PAGE, FAVORITE_PAGE, SETTING_PAGE, BOOKED_PAGE } from '../pages/pages';

import {timer} from 'rxjs/observable/timer';
import { UserService } from '../services/user.service';
import { Events } from 'ionic-angular';

import { User } from '../models/user.model';
import { Storage } from '@ionic/storage';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav:Nav;

  rootPage:any;

  loggedIn;

  menuL: Array<{title: string, component: any, icon:any}>;

  menuNL: Array<{title: string, component: any, icon:any}>;  //menu non loggato

  showSplash = true;

  utente: User;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
      private linguaService: LinguaService, private translate: TranslateService, 
      private UserService: UserService, public events: Events,public actionSheetCtrl: ActionSheetController, 
      public alert:AlertController) {

    
        platform.ready().then(() => {

          console.log("sto per carcare utente in memo");
          this.UserService.getUtente().subscribe((user: User) => {
            if (user != null) {

              console.log("ho un utente in memo");
              this.utente = user;
              this.events.publish('user:login', this.utente);
              
            }else{
              console.log("non ho utente in memo");
            }
          });
        });



    this.menuL = [

      //temporanei sopra
      {title: 'LISTA_EVENTI_MENU', component: EVENTI_PAGE, icon: 'calendar'},
      {title: 'PREFERITI_MENU', component: FAVORITE_PAGE, icon: 'heart'},
      {title: 'EVENTI_CREATI_MENU', component: MYEVENTS_PAGE, icon: 'add'},
      {title: 'EVENTI_PRENOTATI_MENU', component: BOOKED_PAGE, icon: 'checkmark-circle-outline'}
    ];

    this.menuNL = [
      {title: 'LISTA_EVENTI_MENU', component: EVENTI_PAGE, icon: 'calendar' }
    ];

    console.log("constructor MyApp");

    //chiama metodo initTranslate
    this.initTranslate();
    this.listenToLoginEvents();

    platform.ready().then(() => {
      //QUI CAMBIO LA ROOT PAGE
      this.rootPage = EVENTI_PAGE;

      statusBar.styleDefault();
      splashScreen.hide();
      timer(1000).subscribe(()=> this.showSplash = false)
    });

  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Lingua',
      buttons: [
        {
          text: 'Italiano',
          handler: () => {
            console.log('Italiano');
            this.changeLanguage('it');
          }
        },{
          text: 'Inglese',
          handler: () => {
            console.log('English');
            this.changeLanguage('en');
          }
        }
      ]
    });
    actionSheet.present();
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
      console.log(lingua);
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
  this.nav.setRoot(SETTING_PAGE)}

  login(){
    this.nav.setRoot(LOGIN_PAGE)}

  logout(){
    this.UserService.logout();
    this.nav.setRoot(EVENTI_PAGE);
    console.log("logout effettuato");}

  changeLanguage(lang : string){
      console.log(lang);
      this.translate.use(lang);
      this.linguaService.updateLingua(lang);

  }


    listenToLoginEvents() {
        if(this.UserService.checkLogin()===true){
        this.events.subscribe('user:login', (user:User) => {
          this.loggedIn = true;
          this.utente=user;
          console.log(this.utente);
        });
      }


        this.events.subscribe('user:logout', () => {
          this.loggedIn=false;
        });


        this.events.subscribe('server-error', (err: HttpErrorResponse) => {
          //this.showMessageServerError(err);
        });
      }


    /*showMessageServerError(err: HttpErrorResponse) {
    let errorMessage = "Errore nel server";

    switch (err.status) {
      case 403:
        errorMessage = "Utente non autorizzato";
        break;
      case 401:
        errorMessage = "Utente non autenticato";
        break;
      default:
        errorMessage = `Errore: ${err.status}`;
    }
    let alert = this.alert.create({
      title: "Errore",
      subTitle: errorMessage,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.UserService.logout();
            this.nav.setRoot(LOGIN_PAGE);
          }
        }
      ]
    });
    alert.present();
  }*/


}
