import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { URL } from '../constants';
import { Category } from '../models/category.model';

export interface BaseSearchForm {
    where: string;
    when: string;
    what: Date;
}

@Injectable() 
export class CategoryService {

    constructor(private http: HttpClient) {

    }


    categories(): Observable<Array<Category>> {

        console.log("lanciato metodo categories");

        return this.http.get<Array<Category>>(URL.CATEGORIES);
    }

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

}