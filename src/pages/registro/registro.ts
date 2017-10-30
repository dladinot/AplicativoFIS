import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { InicioPage } from '../inicio/inicio';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  user = {} as User;
  profile = {} as Profile;

  constructor(private afAuth: AngularFireAuth, public loadingCtrl: LoadingController,
    public events: Events, private afDataBase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  async register(user: User){
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      //console.log(result);
      let loader = this.loadingCtrl.create({
        content: 'Registrándo...',
        duration: 2500
      });

      loader.present();
      loader.onDidDismiss(() => {

        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDataBase.object(`profile/${auth.uid}`).set(this.profile)
        })
        this.navCtrl.push('InicioPage');
        this.events.publish('showConfirmation');
      });
    }catch(e) {
      //console.error(e);
      let loader = this.loadingCtrl.create({
        spinner: 'hide',
        content: e,
        duration: 3000
      });
      loader.present();
    }
  }

}
