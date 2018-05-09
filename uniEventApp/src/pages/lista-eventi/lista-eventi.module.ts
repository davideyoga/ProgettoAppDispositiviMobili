import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaEventiPage } from './lista-eventi';

@NgModule({
  declarations: [
    ListaEventiPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaEventiPage),
  ],
})
export class ListaEventiPageModule {}
