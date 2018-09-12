import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavParams, NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import {NgForm} from "@angular/forms";
import {EVENTI_PAGE} from "../pages";


declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})

export class CreateEventPage {

  lastImage: string = null;
  loading: Loading;
  event:Event;

  categorie: Array<Category>;

  evento: Event = new Event();

  categoria: Category;

  data: string;
  ora: string;

  today = new Date();
  todayString: string = '';

  @ViewChild('Slider') slider: any;

  constructor(private eventService:EventService,private categoryService: CategoryService, public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');


    this.categoryService.categories().subscribe((data: Array<Category>) => {
      this.categorie = data;

      console.log('Prese categorie');

    });

  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleziona la fonte',
      buttons: [
        {
          text: 'Carica dalla libreria',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usa Fotocamera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Annulla',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // opzioni per la camera
    var options = {
      quality: 80,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    // prendi i dati dell'immagine
    this.camera.getPicture(options).then((imagePath) => {

      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, () => {
      this.presentToast('Error while selecting image.');
    });
  }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName =  n + ".jpg";
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(() => {
      this.lastImage = newFileName;
    }, () => {
      this.presentToast('Error while storing file.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    let url = "/";

    // File for Upload
    let targetPath = this.pathForImage(this.lastImage);

    // File name only
    let filename = this.lastImage;

    let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename},
      httpMethod: 'POST'
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: 'Uploading...',
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(() => {
      this.loading.dismissAll();
      this.presentToast('Image succesful uploaded.');
    }, () => {
      this.loading.dismissAll();
      this.presentToast('Error while uploading file.');
    });
  }

  next(){
    this.slider.lockSwipes(false);
    this.slider.slideNext();
    this.slider.lockSwipes(true);
  }

  back(){
    this.slider.lockSwipes(false);
    this.slider.slidePrev();
    this.slider.lockSwipes(true);
  }

  save(){
    // let event=new Event();
    //s
    // event.price=this.navParams.get("prezzo");
    // event.title=this.navParams.get("titolo");
    // event.date=this.navParams.get("when");
    // event.date=this.navParams.get("when");
    // console.log('riga 197 evento creato prima di salvare');
    // console.log(event.date);
    // console.log(event.price);
    // console.log(event.title);
    // console.log(event.address);

    console.log('orario creazione');
    console.log(this.data);
    console.log(this.ora);
    // let dd=(this.today.getMonth()+1).toString();
    // if(dd.length<2) {
    //   dd = '0'+ dd;
    // }
    //
    // let mm=(this.today.getDate()).toString();
    // if(mm.length<2) {
    //   mm = '0'+ mm;
    // }
    //
    // this.todayString=this.todayString + this.today.getFullYear() + '-' + dd + '-'
    //   + mm + ' ' + this.today.getHours()  + ':' + this.today.getMinutes()  + ':' +  this.today.getSeconds();

    this.evento.date=this.data+ ' ' + this.ora + ':'+'00';

    console.log('stampa evento');
    console.log(this.evento);
    console.log('stampa data');
    console.log(this.evento.date);
    console.log('stampa categoria');
    console.log(this.categoria);

    this.eventService.createEvent(this.evento).subscribe((data:boolean)=>{

      console.log("creazione evento ");
      console.log(data)
      this.navCtrl.push(EVENTI_PAGE);

    });
  }

  //seleziona le categorie
  selectType(data: Category){
    this.categoria=data;
    console.log(this.categoria);
  }


}
