import {Injectable} from '@angular/core';

import { Globalization } from '@ionic-native/globalization';
import {Storage} from '@ionic/storage';

import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


import {STORAGE_KEYS, DICTIONARY_LANGUAGE_DEFAULT, LANGUAGES} from '../constants';

import {OptionsGetDictionary, Language} from '../types';

/**
 * Service per la gestione del dizionario 
 */
@Injectable()
export class DictionaryService {

    public dictionary: any;
    private _preferredLanguage: string;

    constructor(
        private globalization: Globalization,
        private _http: Http,
        private _sStorage: Storage
    ) {
        console.log('Hello Dictionary Provider');
    }

    /**
     * Caricamento del dizionario secondo la lingua preferita.
     */
    load() {
        return new Promise((resolve, reject) => {
            
            this._getLanguageStored().then(value => {
                let {language} = value;
                
                this._preferredLanguage = language;
                
                this._getDictionaryFromAssets(language)
                    .then((dict) => {
                        this.dictionary = dict;
                        resolve();
                    })
                    .catch(() => {
                        reject();
                    });
            })
            
        });
    }


    /**
     * Ritorna il valore corrispondente alla 'key' dal dizionario caricato 
     */
    get(key: string, options?: OptionsGetDictionary) {
        if (this.dictionary) {
            let val: string = this.dictionary[key.toUpperCase()] || "";
            if (val === "") {
                console.log(`Chiave ${key} non trovata nel dizionario corrente`);
            } else {
                if (options) {
                    switch (options.case) {
                        case 'lower':
                            val = val.toLowerCase();
                            break;
                        case 'upper':
                            val = val.toUpperCase();
                            break;
                    }
                }
            }
            return val;
        }
        
        return "";
    }
    
    /**
     * Ritorna la lista di lingue gestite dal dizionario
     */
    getLanguages(): Language[] {
        return LANGUAGES;
    }
    
    /*
     * Setta la lingua preferita dell'utente
     */
    setPreferredLanguage(lang: string): Promise<any> {
        this._preferredLanguage = lang;
        this._sStorage.set(STORAGE_KEYS.DICTIONARY_LANGUAGE, lang);
        
        return this.load();
    }
    
    /*
     * Ritorna la lingua settata come preferita dell'utente
     */
    getPreferredLanguage(): string {
        return this._preferredLanguage;
    }


    /**
     * Metodi Privati
     **************************************************************************/


    /**
     * Recupero della versione e della lingua del dizionario remoto salvato in locale.
     */
    private _getLanguageStored(): Promise<{language: string}> {
        return new Promise(resolve => {
            this._sStorage.get(STORAGE_KEYS.DICTIONARY_LANGUAGE).then(language => {
                
                if (!language) {
                    this._getPreferredLanguage().then(language => {
                        this._sStorage.set(STORAGE_KEYS.DICTIONARY_LANGUAGE, language);
                        resolve({language});
                    });
                } else {
                    resolve({language});
                }
                
            });
        });
    }
    
    /**
     * Restituisce la lingua preferita dall'utente impostata nel device
     */
    public _getPreferredLanguage(): Promise<string> {
        return new Promise(resolve => {
            this.globalization.getPreferredLanguage()
                .then(res => {
                    resolve(res.value);
                })
                .catch(() => {
                    resolve(DICTIONARY_LANGUAGE_DEFAULT);
                });
        });
    }


    /**
     * Recupero del dizionario locale contenuto nella directory 'assets/json'.
     */
    private _getDictionaryFromAssets(lang: string): Promise<any> {
        return new Promise((resolve, reject) => {
            //recupero il dizionario in assets/json
            this._http.get(`assets/i18n/${lang}.json`).toPromise()
                .then((res: Response) => {
                    resolve(res.json());
                })
                .catch((err: Response) => {
                    console.log(`Dizionario non trovato: ${lang}`);
                    
                    if (lang !== DICTIONARY_LANGUAGE_DEFAULT) {
                        this._getDictionaryFromAssets(DICTIONARY_LANGUAGE_DEFAULT)
                            .then(dict => {
                                resolve(dict);
                            })
                            .catch(() => {
                                reject();
                            });
                    } else {
                        reject();
                    }
                    
                });
        });
    }

}
