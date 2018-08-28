import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritePage } from './favorite';

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [
    FavoritePage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritePage),
    TranslateModule.forChild()
  ],
})
export class FavoritePageModule {}
