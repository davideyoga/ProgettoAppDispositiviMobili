import { Injectable } from "@angular/core";
import { URL } from '../constants';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { User } from "../models/user.model";

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {

    }

    //token dell'utente crhe va settato durante il login
    private tokenUtente: string;

    getUtenteToken(): string {
        return this.tokenUtente;
    } 
    
    getUserCreatedEvent(idEvent: number): Observable<User>{

        console.log("lanciato metodo getUserCreatedEvent");

        let getUserCreatedEventURL = `${URL.GET_USER_CREATED_EVENT}/${idEvent}`;

        return this.http.get<User>(getUserCreatedEventURL);

    }

}