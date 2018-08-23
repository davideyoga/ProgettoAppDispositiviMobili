import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { DettaglioEventoPage } from './dettaglio-evento';

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
