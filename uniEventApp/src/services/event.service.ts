import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController } from "ionic-angular";

import { URL } from '../constants';
import { BaseSearchForm } from '../models/base.sear.form.model';
import { Event } from '../models/event.model';
import { AdvanceSearchForm } from '../models/advance.search.model';


@Injectable()
export class EventService {

    constructor(private http: HttpClient, private alertCtrl: AlertController) {

    }

    listHotEvent(): Observable<Array<Event>> {

        console.log("URL.HOT_EVENT: " + URL.HOT_EVENT);

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

    //get all favorite events method



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

    advanceSearch(advanceSearch : AdvanceSearchForm): Observable<Array<Event>>{

       //let apiURL = `${URL.ADVANCE_SEARCH}`;

       //return this.http.post<Array<Event>>(apiURL, advanceSearch);


       console.log("`${URL.ADVANCE_SEARCH}`: " + `${URL.ADVANCE_SEARCH}`);
       return this.http.post<Array<Event>>(URL.ADVANCE_SEARCH, advanceSearch, {observe: 'response'})
           .map((resp: HttpResponse<Array<Event>>) => {

               console.log("resp.body.valueOf():" + resp.body.valueOf());

               return resp.body;
           });



    }

    createEvent(event : Event): Observable<boolean>{
        console.log("URL.CREATE_EVENT: " + URL.CREATE_EVENT);
        return this.http.post<boolean>(URL.CREATE_EVENT, event, {observe: 'response'})
            .map((resp: HttpResponse<boolean>) => {
                //Aggiornamento dell'utente nello storage.
                //Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
                //e se l'utente chiude la app e la riapre i dati sono gia' presenti

                console.log("resp.body.valueOf():" + resp.body.valueOf());

                return resp.body;
            });
    }


    getEventPrenotatedByToken(token: String): Observable<Array<Event>>{

        return this.http.post<Array<Event>>(URL.EVENT_REGISTERED, event, {observe: 'response'})
            .map((resp: HttpResponse<Array<Event>>) => {
                //Aggiornamento dell'utente nello storage.
                //Utente memorizzato nello storage per evitare chiamata REST quando si vuole modificare il profilo
                //e se l'utente chiude la app e la riapre i dati sono gia' presenti

                console.log("resp.body.valueOf():" + resp.body.valueOf());

                return resp.body;
            });
    }


    bookedEvent(token: string, idEvent: number): Observable<boolean>{

        const params = new HttpParams()
            .set('token', token)
            .set('idEvent', String(idEvent));

        let apiURL = `${URL.BOOK_EVENT}`
        return this.http.post<boolean>(apiURL, params);

    }

    favoriteEvent(token: string): Observable<Array<Event>>{

        const params = new HttpParams()
            .set('token', token);

        let apiURL = `${URL.FAVORITE_EVENT}`
        return this.http.post<Array<Event>>(apiURL, params);

    }

}
