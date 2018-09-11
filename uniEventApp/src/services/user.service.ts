import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { AUTH_TOKEN, URL, UTENTE_STORAGE} from '../constants';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import {Events} from 'ionic-angular';
import { Register } from "../models/register.model";
import 'rxjs/Rx';
import { fromPromise } from 'rxjs/observable/fromPromise';


@Injectable()
export class UserService {

    //token dell'utente che va settato durante il login
    private tokenUtente: string;

    constructor(private http: HttpClient, private storage: Storage, public events:Events) {
        this.storage.get(AUTH_TOKEN).then((token) => {
            this.tokenUtente = token;
        });
    }

    getUtente(): Observable<User> {
      return fromPromise(this.storage.get(UTENTE_STORAGE));
  }

    getUtenteToken(): string{
        return this.tokenUtente;
    }

    checkLogin():boolean{
      if(this.getUtenteToken()!="" || this.getUtenteToken()!=null)
      return true;
    }

    getUserCreatedEvent(idEvent: number): Observable<User>{

        console.log("lanciato metodo getUserCreatedEvent");

        let getUserCreatedEventURL = `${URL.GET_USER_CREATED_EVENT}/${idEvent}`;

        return this.http.get<User>(getUserCreatedEventURL);

    }

    login(user: User): Observable<Login>{

        //console.log("Entrato nel metodo login");
        //console.log("user.email: " + user.email);
        //console.log("user.password: " + user.password);

        return this.http.post<Login>(URL.LOGIN, user, { observe: 'response' })
            .map((resp: HttpResponse<Login>) => {

                //console.log("Entrato nel metodo map");

                if(resp.body!=null){

                    const token = resp.body.token;


                    this.storage.set(AUTH_TOKEN, token);
                    this.storage.set(UTENTE_STORAGE, resp.body.user);


                    // this.storage.get(AUTH_TOKEN).then((token) => {
                    //     console.log("token in memo: " + token);
                    // });

                    //console.log("resp.body.token: " + resp.body.token);

                    this.tokenUtente = token;

                    return resp.body;
                }else{
                    return null;
                }
            });
    }

    register(email: string, password: string): Observable<Login>{

        const params = new HttpParams()
        .set('email', email)
        .set('password', password);
        



        let apiURL = `${URL.REGISTER}`
        return this.http.post<Login>(apiURL, params);

        // return this.http.post<Login>(URL.REGISTER, user, { observe: 'response' })
        //     .map((resp: HttpResponse<Login>) => {
        //         if(resp.body!=null){

        //             const token = resp.body.token;


        //             this.storage.set(AUTH_TOKEN, token);
        //             this.storage.set(UTENTE_STORAGE, resp.body.user);


        //             // this.storage.get(AUTH_TOKEN).then((token) => {
        //             //     console.log("token in memo: " + token);
        //             // });

        //             //console.log("resp.body.token: " + resp.body.token);

        //             this.tokenUtente = token;

        //             return resp.body;
        //         }else{
        //             return null;
        //         }
        //     });

      // console.log('register function');
      //return ;
    }


    logout(){
        this.tokenUtente = "";
        this.storage.remove(AUTH_TOKEN);
        this.storage.remove(UTENTE_STORAGE);
        this.events.publish('user:logout');
        //Nessuna chiamata al server perche' JWT e' stateless quindi non prevede alcun logout.
        //Per gestirlo si dovrebbe fare lato server una blacklist.
    }

    addUserFavorite(token: string, idEvent: number){

        console.log("lanciato metodo addUserFavorite" );

        let apiUrl = `${URL.ADD_FAVORITE}/${token}/${idEvent}`;

        console.log("apiUrl: " + apiUrl );

        return this.http.get<boolean>(apiUrl);

    }

    removeUserFavorite(token: string, idEvent: number){

        let apiUrl = `${URL.REMOVE_FAVORITE}/${token}/${idEvent}`;

        return this.http.get<boolean>(apiUrl);

    }


    updateUser(user: User): Observable<User>{

        return this.http.post<User>(URL.UPDATE_USER, user, { observe: 'response' })
            .map((resp: HttpResponse<User>) => {

                console.log("Entrato nel metodo updateUser");

                if(resp.body!=null){

                    this.storage.set(UTENTE_STORAGE, resp.body);

                    console.log("resp.body: ");
                    console.log(resp.body);

                    return resp.body;
                }else{
                    return null;
                }
            });
    }

}
