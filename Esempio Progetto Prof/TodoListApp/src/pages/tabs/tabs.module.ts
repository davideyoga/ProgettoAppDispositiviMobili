import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {TabsPage} from './tabs';

import {DictionaryModule} from '../../modules/dictionary/dictionary.module';

@NgModule({
    declarations: [
        TabsPage,
    ],
    imports: [
        DictionaryModule,
        IonicPageModule.forChild(TabsPage)
    ],
    exports: [
        TabsPage
    ]
})
export class TabsModule {}
