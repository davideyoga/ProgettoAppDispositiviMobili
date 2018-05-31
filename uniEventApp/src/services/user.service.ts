import { Injectable } from "@angular/core";

@Injectable()
export class UserService {

    //token dell'utente ce va settato durante il login
    private tokenUtente: string;


    getUtenteToken(): string {
        return this.tokenUtente;
    }   

}