import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { eventlist } from './eventlist';

@NgModule({
  declarations: [
    eventlist,
  ],
  imports: [
    IonicPageModule.forChild(eventlist),
  ],
})
export class EventListPageModule {}
