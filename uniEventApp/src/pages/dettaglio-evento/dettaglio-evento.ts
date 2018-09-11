import { Component } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {IonicPage, NavController, NavParams, ModalController, Platform, ViewController} from 'ionic-angular';

import { Event } from '../../models/event.model';
import { User } from '../../models/user.model';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { SocialSharing } from "@ionic-native/social-sharing";
import { ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PAYMENT_PAGE, LOGIN_PAGE } from '../pages';

@IonicPage()
@Component({
  selector: 'page-dettaglio-evento',
  templateUrl: 'dettaglio-evento.html',
  providers: [FileTransfer, FileTransferObject, File]
})
export class DettaglioEventoPage {

  evento:Event;
  creatore:User;
  image: File;
  storageDirectory: string = '/';
  priceFlag: boolean;
  favorite: boolean;
  closed: boolean;
  loggedIn: boolean=false;
  utente: User;



  constructor(public navCtrl: NavController, public navParams: NavParams, public eventService: EventService,
              public userService: UserService,
              private transfer: FileTransfer, private file: File,
              private iab: InAppBrowser,
              private socialSharing: SocialSharing,
              public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              public events:Events) {
  }


  ionViewDidLoad() {

    console.log('ionViewDidLoad DettaglioNotiziaPage');


    if(this.userService.checkLogin()==true){
      this.events.subscribe('user:login', (user:User) => {
        this.loggedIn = true;
        this.utente=user;
        console.log("sono loggato");
      });
    }


      this.events.subscribe('user:logout', () => {
        this.loggedIn=false;
      });




    //gestione data
    let today = new Date();
    let todayString: string = '';
    todayString=todayString + today.getFullYear() + '-' + '0' + (today.getMonth()+1) + '-' + today.getDate()
                + ' ' + today.getHours()  + ':' + today.getMinutes()  + ':' +  today.getSeconds();

    console.log('data');
    console.log(today);
    console.log(todayString);
    console.log('\n');

    this.eventService.findById(this.navParams.data.eventoId).subscribe((data: Event) => {

      this.evento = data;

      if (this.evento.price!=null){
        console.log(this.evento.price);
        this.priceFlag=true;
      }
      else {
        console.log(this.evento.price + "no prezzo");
        this.priceFlag=false;
      }
      if (this.evento.date!=null){
        console.log(this.evento.date);
        if (todayString >= this.evento.date)
          this.closed=true;
        console.log(this.closed);
      }



      this.userService.getUserCreatedEvent(this.evento.id).subscribe((data: User) => {
        this.creatore = data;
      });

      //controlla se l'evento è tra i preferiti dell'utente
      this.favorite=false;

    });

    //prendo image dal server
    this.download(this.navParams.data.eventoId);

  }

  // ionViewDidLeave() {
  //   console.log('ionViewDidLeave DettaglioEventoPage');
  //   //Inserito perche' se l'utente va in un altro tab (es. esami), e ritorna nel tab esami rimane aperta questa vista
  //   this.navCtrl.popToRoot();
  // }

  infoUser(){

    this.navCtrl.push('EventCreatorPage', { user: this.creatore })

  }

  download(idEvent: number) {

    // const fileTransfer: FileTransferObject = this.transfer.create();

    // const url = `${URL.IMAGE}/${idEvent}`;

    // console.log("url: "+url);
    // console.log("Sto per fare la chiamata per l'immagine");

    // fileTransfer.download(url, "" ).then((entry) => {

    //   console.log('download complete: ' + entry.toURL());
    //   this.image = entry;
    // }, (error) => {
    //   console.log("Errore download");
    // });
    // console.log("fine metodo download");

    const fileTransfer: FileTransferObject = this.transfer.create();

    const url = 'http://www.example.com/file.pdf';
    fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      console.log("ERROR in fileTransfer" );
    });

  }

  openMap(){
    let url= 'https://www.google.com/maps/search/?api=1&query=';
    if (this.evento.address != null)
      url = url+this.evento.address;
    if (this.evento.city != null)
      url=url+' '+this.evento.city;

    console.log(url);
    url=url.split(' ').join('%20');
    url=url.split(',').join('%2C');
    console.log(url);
    window.open(url, '_system')
  }

  share(){
    this.socialSharing.share(this.evento.id.toString())
      .then(() =>{

      }).catch(() => {

    });
  }

  openPayment(e: Event){

    this.navCtrl.push(PAYMENT_PAGE, { eventoId: e.id});
  }



  setFavorite(e: Event){
    let token= this.userService.getUtenteToken();
    this.userService.addUserFavorite(token, e.id).subscribe((data: boolean) => {
      console.log('booked event');
      console.log(data);
      this.favorite=true;
      let toast = this.toastCtrl.create({
        message: 'Evento aggiunto ai preferiti',
        duration: 2000,
        position: 'top'
      });

      toast.present(toast);
    });
  }

  unsetFavorite(e: Event){
    let token= this.userService.getUtenteToken();
    this.userService.removeUserFavorite(token, e.id).subscribe((data: boolean) => {
      console.log('remove booked event');
      console.log(data);
      this.favorite=false;
      let toast = this.toastCtrl.create({
        message: 'Evento rimosso dai preferiti',
        duration: 2000,
        position: 'top'
      });

      toast.present(toast);
    });
  }

  getCurrentDate(){
    let today = new Date().getDate();

    console.log(today);
  }

  login(){

    this.navCtrl.setRoot(LOGIN_PAGE);


  }




}

