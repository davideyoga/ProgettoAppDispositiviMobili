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
  var url = "/";

  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);

  // File name only
  var filename = this.lastImage;

  var options = {
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
  var event=new Event();

  event.price=this.navParams.get("prezzo");
  event.title=this.navParams.get("titolo");
  event.date=this.navParams.get("when");
  event.date=this.navParams.get("when");


  this.eventService.createEvent(this.event).subscribe((data:boolean)=>{

console.log("creazione evento " +data)

  });
}


}
