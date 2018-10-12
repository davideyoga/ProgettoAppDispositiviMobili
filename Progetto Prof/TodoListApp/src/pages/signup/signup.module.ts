import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {SignupPage} from './signup';

import {DictionaryModule} from '../../modules/dictionary/dictionary.module';

@NgModule({
    declarations: [
        SignupPage,
    ],
    imports: [
        DictionaryModule,
        IonicPageModule.forChild(SignupPage),
    ],
    exports: [
        SignupPage
    ]
})
export class SignupModule {}
