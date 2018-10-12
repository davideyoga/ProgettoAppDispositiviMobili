import {NgModule} from '@angular/core';

import {DictionaryPipe} from './pipes/dictionary';
import {DictionaryService} from './providers/dictionary.service';

import { Globalization } from '@ionic-native/globalization';

@NgModule({
    declarations: [
        DictionaryPipe
    ],
    exports: [
        DictionaryPipe
    ],
    providers: [
        DictionaryService,
        Globalization
    ]
})
export class DictionaryModule {}
