import { Profile } from '../../models/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
//import { Camera, File, Entry } from 'ionic-native/core';


@IonicPage()
@Component({
  selector: 'page-datos-perfil',
  templateUrl: 'datos-perfil.html',
})
export class DatosPerfilPage {

  profile = {} as Profile;

  //reestringir el botón para que no envíe datos vacios
  constructor(private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase,
     public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosPerfilPage');
  }

  createProfile() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDataBase.object(`profile/${auth.uid}`).set(this.profile).then(
        () => this.navCtrl.setRoot('HomePage')
      )
    });
  }

}
