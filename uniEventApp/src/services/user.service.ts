import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { AUTH_TOKEN, URL, UTENTE_STORAGE, X_AUTH } from '../constants';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

    //token dell'utente che va settato durante il login
    private tokenUtente: string;

    constructor(private http: HttpClient, private storage: Storage) {
        this.storage.get(AUTH_TOKEN).then((token) => {
            this.tokenUtente = token;
        });
    }
    
    getUtenteToken(): string {
        return this.tokenUtente;
    } 
    
    getUserCreatedEvent(idEvent: number): Observable<User>{

        console.log("lanciato metodo getUserCreatedEvent");

        let getUserCreatedEventURL = `${URL.GET_USER_CREATED_EVENT}/${idEvent}`;

        return this.http.get<User>(getUserCreatedEventURL);

    }

    login(user: User): Observable<Login> {
        return this.http.post<Login>(URL.LOGIN, user, { observe: 'response'})
            .map((resp: HttpResponse<Login>) => {
                const token = resp.headers.get(X_AUTH);
                this.storage.set(AUTH_TOKEN, token);
                this.tokenUtente = token;
                //Utente memorizzato nello storage in modo tale che se si vuole cambiare il
                //profilo dell'utente stesso non si fa una chiamata REST. 
                this.storage.set(UTENTE_STORAGE, resp.body);
                return resp.body;
            });        
    }


}