import {Injectable} from '@angular/core';
import {reorderArray} from 'ionic-angular';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {ReorderIndexes} from '../../types';

//Providers
// import {AccountProvider} from './account.provider';

//Models
import {Event} from '../../models/event.model';

//Constants
import {URL_BASE, URL} from '../../constants';

//Types
import {ResponseServer, OrderTask} from '../../types';

@Injectable()
export class EventProvider {

    private _events: Array<Event> = null;

    constructor(
        private _http: Http
    ) {
        console.log('Hello Event Provider');
    }

    /**
     * Recupera gli eventi dal server.
     */

    getEvents(): Promise<Array<Event>> {
        return new Promise((resolve) => {
            if (this._events === null) {
                this._events = [];

                this._http.get(URL_BASE + URL.EVENTS.GETALL).toPromise()
                    .then((res: Response) => {
                        const json = res.json() as ResponseServer;

                        if (json.result) {
                            const events = json.data;
                            for (let event of events) {
                                this._events.push(new Event(event));
                            }
                            resolve(this._events);
                        } else {
                            resolve(this._events);
                        }
                    })
                    .catch(() => resolve(this._events));
            } else {
                resolve(this._events);
            }
        });
    }



}
