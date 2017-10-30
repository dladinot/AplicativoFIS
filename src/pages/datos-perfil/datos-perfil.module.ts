import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatosPerfilPage } from './datos-perfil';

@NgModule({
  declarations: [
    DatosPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(DatosPerfilPage),
  ],
})
export class DatosPerfilPageModule {}
