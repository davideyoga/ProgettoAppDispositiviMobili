import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController } from "ionic-angular";

import { URL } from '../constants';
import { BaseSearchForm } from '../models/base.sear.form.model';
import { Event } from '../models/event.model';


@Injectable()
export class EventService {

    constructor(private http: HttpClient, private alertCtrl: AlertController) {

    }

    listHotEvent(): Observable<Array<Event>> {
        return this.http.get<Array<Event>>(URL.HOT_EVENT);
    }

    //getAllEvents
    events(): Observable<Array<Event>> {
        console.log("lanciato metodo events");
        return this.http.get<Array<Event>>(URL.EVENTS);
    }

    listCities(): Observable<Array<String>> {

        console.log("lanciato metodo listCities");
        return this.http.get<Array<String>>(URL.CITIES);
    }




    baseSearch(b:BaseSearchForm): Observable<Array<Event>> {
      var baseSearchFormUrl;
      if(b.what=="" && b.where==""){
         baseSearchFormUrl = `${URL.BASE_SEARCH}/null/null/${b.when}`;
        return this.http.get<Array<Event>>(baseSearchFormUrl);}
        else if(b.what=="" ){
          baseSearchFormUrl = `${URL.BASE_SEARCH}/null/${b.where}/${b.when}`;
         return this.http.get<Array<Event>>(baseSearchFormUrl);}
         else if(b.where=="" ){
          baseSearchFormUrl = `${URL.BASE_SEARCH}/${b.what}/null/${b.when}`;
         return this.http.get<Array<Event>>(baseSearchFormUrl);}

      else{
      baseSearchFormUrl = `${URL.BASE_SEARCH}/${b.what}/${b.where}/${b.when}`;

      console.log(baseSearchFormUrl);
        return this.http.get<Array<Event>>(baseSearchFormUrl);}
  }




    findById(eventId: number): Observable<Event> {
      let apiURL = `${URL.EVENT}/${eventId}`;
      return this.http.get<Event>(apiURL);
    }

    getEventByUserCreator(idUser: number): Observable<Array<Event>> {
        let apiURL = `${URL.GET_EVENT_CREATED_BY_USER}/${idUser}`;
        return this.http.get<Array<Event>>(apiURL);
    }

    getEventImage(idEvent: number): Observable<File>{

        let apiURL = `${URL.IMAGE}/${idEvent}`;
        return this.http.get<File>(apiURL);

    }

}
