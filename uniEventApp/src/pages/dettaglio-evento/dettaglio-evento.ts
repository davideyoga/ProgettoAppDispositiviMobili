import { Component } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Event } from '../../models/event.model';
import { User } from '../../models/user.model';
import { EventService } from '../../services/event.service';
import { UserService } from '../../services/user.service';
import { URL } from '../../constants';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { SocialSharing } from "@ionic-native/social-sharing";
import { PaymentPage } from "../payment/payment";

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



  constructor(public navCtrl: NavController, public navParams: NavParams, public eventService: EventService,
                public userService: UserService,
                private transfer: FileTransfer, private file: File,
                private iab: InAppBrowser,
                private socialSharing: SocialSharing) {
  }


  ionViewDidLoad() {

    console.log('ionViewDidLoad DettaglioNotiziaPage');
    
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

      this.userService.getUserCreatedEvent(this.evento.id).subscribe((data: User) => {
        this.creatore = data;
      });

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
    url = url+this.evento.address;
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

    this.navCtrl.push('PaymentPage', { eventoId: e.id});
  }
  

}
