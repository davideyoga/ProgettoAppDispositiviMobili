import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';


/**
 * Generated class for the BookedeventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookedevent',
  templateUrl: 'bookedevent.html',
})
export class BookedeventPage {

  lat: any;
  lng: any;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geo: Geolocation) {
  }

  ionViewDidLoad() {
    this.loadMap();
    // this.geo.getCurrentPosition().then(pos => {
    //   this.lat = pos.coords.latitude;
    //   this.lng = pos.coords.longitude;
    // }).catch(err => console.log(err));  
  }

  loadMap() {
      // Create a map after the view is loaded.
      // (platform is already ready in app.component.ts)
      this.map = GoogleMaps.create('map_canvas', {
        camera: {
          target: {
            lat: 43.0741704,
            lng: -89.3809802
          },
          zoom: 18,
          tilt: 30
        }
      });
  
  }
  onButtonClick() {
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null ,2));

        // Move the map camera to the location with animation
        this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        })
        .then(() => {
          // add a marker
          let marker: Marker = this.map.addMarkerSync({
            title: '@ionic-native/google-maps plugin!',
            snippet: 'This plugin is awesome!',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });

          // show the infoWindow
          marker.showInfoWindow();

          // // If clicked it, display the alert
          // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          //   this.showToast('clicked!');
          // });
        });
      });
  }

}