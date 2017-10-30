import { User } from '../../models/user';
import { Profile } from '../../models/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events,
   AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {

  user = {} as User;
  profileData: FirebaseObjectObservable<any>

  constructor(private afAuth: AngularFireAuth, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController, public events: Events,
    private afDataBase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      events.subscribe('showConfirmation', () => {
        this.showConfirmation();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

  async login(user: User){
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(
      data => {
        let loader = this.loadingCtrl.create({
          duration: 500
        });
        loader.present();
        loader.onDidDismiss(() => {
          //After duration time.
          this.afAuth.authState.subscribe(data => {
            this.profileData = this.afDataBase.object(`profile/${data.uid}`,{preserveSnapshot:true})
            this.profileData.subscribe(snapshot => {
              if(!snapshot.exists()){
                this.navCtrl.setRoot('DatosPerfilPage');
              }else{
                this.navCtrl.setRoot('HomePage');
              }
            })
          })
        });
      }).catch(
        error => {
          let loader = this.loadingCtrl.create({
            spinner: 'hide',
            content: error.message,
            duration: 2500
          });
          loader.present();
        })
  }

  register(){
    this.navCtrl.push('RegistroPage');
  }

  public showConfirmation(){
    let loader = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Usuario registrado con éxito.',
      duration: 1500
    });
    loader.present();
  }

}
