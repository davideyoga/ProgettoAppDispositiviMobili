import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { AUTH_TOKEN, URL, UTENTE_STORAGE, X_AUTH } from '../constants';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

import 'rxjs/Rx';
import { PARAMETERS } from '@angular/core/src/util/decorators';

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
        return this.http.post<Login>(URL.LOGIN, user, { observe: 'response' })
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

    logout(){
        
        this.tokenUtente = "";
        this.storage.remove(AUTH_TOKEN);
        this.storage.remove(UTENTE_STORAGE);
        //Nessuna chiamata al server perche' JWT e' stateless quindi non prevede alcun logout.
        //Per gestirlo si dovrebbe fare lato server una blacklist.
    }

    getValueReview(idUser: number): Observable<number>{

        let apiURL = `${URL.VALUE_REVIEW}/${idUser}`;

        return this.http.get<number>(apiURL);

    }

}