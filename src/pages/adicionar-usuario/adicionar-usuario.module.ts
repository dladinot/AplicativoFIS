import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarUsuarioPage } from './adicionar-usuario';

@NgModule({
  declarations: [
    AdicionarUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarUsuarioPage),
  ],
})
export class AdicionarUsuarioPageModule {}
