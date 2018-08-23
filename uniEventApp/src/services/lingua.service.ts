import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { LINGUA } from '../constants';

export interface Lingua {
    etichetta: string;
    valore: string;
}

@Injectable()
export class LinguaService {

    italiano: Lingua = { etichetta: "Italiano", valore: "it" };
    lingue: Array<Lingua> = [this.italiano, { etichetta: "English", valore: "en" }];

    constructor(private storage: Storage) {

    }

    getLinguaAttuale(): Observable<string> {
        return fromPromise(this.storage.get(LINGUA));
    }

    getLinguaPreferita(): string {
        return this.italiano.valore;
    }

    getLingue(): Array<Lingua> {
        return this.lingue;
    }

    updateLingua(nuovaLingua: string) {
        this.storage.set(LINGUA, nuovaLingua);
    }

}