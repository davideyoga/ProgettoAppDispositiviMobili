import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { eventlist } from './eventlist';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    eventlist,
  ],
  imports: [
    IonicPageModule.forChild(eventlist),
    TranslateModule.forChild()
  ],
})
export class EventListPageModule {}
