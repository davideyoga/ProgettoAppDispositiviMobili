import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage, Loading, LoadingController,
  NavController,
  NavParams, Platform,
  ToastController
} from 'ionic-angular';
import {Camera} from "@ionic-native/camera";
import {Transfer, TransferObject} from "@ionic-native/transfer";
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import { Storage } from '@ionic/storage';
import {UTENTE_STORAGE} from "../../constants";
import {User} from "../../models/user.model";


declare var cordova: any;

/**
 * Generated class for the ProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  photo: string = null;
  loading: Loading;
  utente: User;
  maskMail: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath,
              public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController,
              public platform: Platform, public loadingCtrl: LoadingController, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
    this.storage.get(UTENTE_STORAGE).then((user) => {
      console.log('ci arrivo');
      this.utente=user;
      console.log(this.utente);
      if (this.utente== null){
        this.utente={  id: 0,
          name: "",
          surname: "",
          email: "pippo",
          age: 0,
          address: "",
          telephoneNumber: 0,
          password: "pippo"};
      }
      console.log('ci arrivo 2');
    })
  }


  //per la foto profilo
  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  changeImg(){
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

  takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 80,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
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
    }, (err) => {
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
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.photo = newFileName;
    }, error => {
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
    var url = "../assets/imgs";

    // File for Upload
    var targetPath = this.pathForImage(this.photo);

    // File name only
    var filename = this.photo;

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
    fileTransfer.upload(targetPath, url, options).then(data => {
      this.loading.dismissAll()
      this.presentToast('Image succesful uploaded.');
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });
  }

  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------
  // fine foto profilo


  doPromptEmail() {
    let prompt = this.alertCtrl.create({
      title: 'Cambia Email',
      message: "Inserisci una nuova email",
      inputs: [
        {
          name: 'email',
          placeholder: this.utente.email
        },
      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'destructive',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salva',
          handler: data => {
            console.log('Saved clicked');
            console.log(data);
            if (this.changeEmail(data.email)) {
              console.log('Saved clicked');
            }
            else {
              //mettere erore
            }
          }
        }
      ]
    });
    prompt.present();
  }

  changeEmail(mail: string){
    let re = /\S+@\S+\.\S+/;
    if ( re.test(mail)){
      this.utente.email=mail;
      return true;
    }
    else return false;
  }

  doPromptName() {
    let prompt = this.alertCtrl.create({
      title: 'Cambia nome',
      message: "Inserisci il nuovo nome",
      inputs: [
        {
          name: 'name',
          placeholder: this.utente.name
        },
      ],
      buttons: [
        {
          text: 'Annulla',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salva',
          handler: data => {
            console.log('Saved clicked');
            console.log(data);
            this.utente.name=data.name;
          }
        }
      ]
    });
    prompt.present();
  }

  doPromptSurname() {
    let prompt = this.alertCtrl.create({
      title: 'Cambia cognome',
      message: "Inserisci il nuovo cognome",
      inputs: [
        {
          name: 'surname',
          placeholder: this.utente.surname
        },
      ],
      buttons: [
        {
          text: 'Annulla',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salva',
          handler: data => {
            console.log('Saved clicked');
            console.log(data);
            this.utente.surname=data.surname;
          }
        }
      ]
    });
    prompt.present();
  }

  doPromptPw() {
    let prompt = this.alertCtrl.create({
      title: 'Cambia password',
      message: "Inserisci la nuova password",
      inputs: [
        {
          name: 'pass',
          type: 'password',
          placeholder: 'Password'
        },
        {
          name: 'pass2',
          type: 'password',
          placeholder: 'Conferma password'
        },
      ],
      buttons: [
        {
          text: 'Annulla',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salva',
          handler: data => {
            console.log('Saved clicked');
            console.log(data);
            if (data.pass==data.pass2)
              this.utente.password=data.password;
          }
        }
      ]
    });
    prompt.present();
  }

  doPromptNumb() {
    let prompt = this.alertCtrl.create({
      title: 'Cambia numeroo',
      message: "Inserisci il nuovo numero di telefono",
      inputs: [
        {
          name: 'number',
          placeholder: 'Numero'
        },
      ],
      buttons: [
        {
          text: 'Annulla',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salva',
          handler: data => {
            console.log('Saved clicked');
            console.log(data);
            let phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            let digits = data.number.replace(/\D/g, "");
            if (phoneRe.test(digits)){
              this.utente.telephoneNumber=data.number;
            }
            else{
              // erroe
            }
          }
        }
      ]
    });
    prompt.present();
  }

  doPromptAddr() {
    let prompt = this.alertCtrl.create({
      title: 'Cambia indirizzo',
      message: "Inserisci il nuovo indirizzo",
      inputs: [
        {
          name: 'address',
          placeholder: 'Indirizzo'
        },
      ],
      buttons: [
        {
          text: 'Annulla',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salva',
          handler: data => {
            console.log('Saved clicked');
            console.log(data);
            this.utente.address=data.address;
          }
        }
      ]
    });
    prompt.present();
  }
}
