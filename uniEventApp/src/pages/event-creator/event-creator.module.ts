import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { EventCreatorPage } from './event-creator';

@NgModule({
  declarations: [
    EventCreatorPage,
  ],
  imports: [
    IonicPageModule.forChild(EventCreatorPage),
    TranslateModule.forChild()
  ],
})
export class EventCreatorPageModule {}
