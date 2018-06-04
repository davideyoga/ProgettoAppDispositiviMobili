import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DettaglioEventoPage } from './dettaglio-evento';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DettaglioEventoPage,
  ],
  imports: [
    IonicPageModule.forChild(DettaglioEventoPage),
    TranslateModule.forChild()
  ],
})
export class DettaglioEventoPageModule {}
