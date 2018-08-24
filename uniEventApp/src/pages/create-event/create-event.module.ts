import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateEventPage } from './create-event';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreateEventPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateEventPage),
    TranslateModule.forChild()
  ],
})
export class CreateEventPageModule {}
