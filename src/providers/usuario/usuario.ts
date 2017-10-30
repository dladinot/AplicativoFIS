import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  constructor(public afDatabase:AngularFireDatabase) {

  }
  setAsignaturas(idUsuario,data){

      this.afDatabase.object('perfil/'+idUsuario+'/asignaturas').set(data);



  }

}
