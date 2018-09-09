import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileEditPage } from './profile-edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProfileEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileEditPage),
    TranslateModule.forChild()
  ],
})
export class ProfileEditPageModule {}
