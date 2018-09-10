import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookedEventsPage } from './booked-events';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BookedEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(BookedEventsPage),
    TranslateModule.forChild()
  ],
})
export class BookedEventsPageModule {}
