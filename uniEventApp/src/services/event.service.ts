import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { URL } from '../constants';
import { Event } from '../models/event.model';
import { BaseSearchForm } from '../models/base.sear.form.model';


@Injectable()
export class EventService {

    constructor(private http: HttpClient) {

    }

    listHotEvent(): Observable<Array<Event>> {
        console.log("lanciato metodo listHotEvent");
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

        let baseSearchFormUrl = `${URL.BASE_SEARCH}/${b.what}/${b.where}`;

        return this.http.get<Array<Event>>(baseSearchFormUrl);
    }


    // list(): Observable<Array<Notizia>> {
    //     return this.http.get<Array<Notizia>>(URL.NOTIZIE);
    // }

    // getLinguaAttuale(): Observable<string> {
    //     return fromPromise(this.storage.get(LINGUA));
    // }

    // getLinguaPreferita(): string {
    //     return this.italiano.valore;
    // }

    // getLingue(): Array<Lingua> {
    //     return this.lingue;
    // }

    // updateLingua(nuovaLingua: string) {
    //     this.storage.set(LINGUA, nuovaLingua);
    // }


    findById(eventId: number): Observable<Event> {
      let apiURL = `${URL.EVENT}/${eventId}`;
      return this.http.get<Event>(apiURL);
  }
}
