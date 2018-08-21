import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyeventsPage } from './myevents';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyeventsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyeventsPage),
    TranslateModule.forChild()
  ],
})
export class MyeventsPageModule {}
