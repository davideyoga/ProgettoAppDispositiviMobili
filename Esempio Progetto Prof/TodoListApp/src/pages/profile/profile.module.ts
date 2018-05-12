import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProfilePage} from './profile';

import {DictionaryModule} from '../../modules/dictionary/dictionary.module';

@NgModule({
    declarations: [
        ProfilePage,
    ],
    imports: [
        DictionaryModule,
        IonicPageModule.forChild(ProfilePage),
    ],
    exports: [
        ProfilePage
    ]
})
export class ProfileModule {}
