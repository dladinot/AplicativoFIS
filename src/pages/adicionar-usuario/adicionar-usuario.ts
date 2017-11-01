import { Profile } from '../../models/profile';
import { User } from '../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Events, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsuariosPage } from '../usuarios/usuarios';
/**
 * Generated class for the AdicionarUsuarioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adicionar-usuario',
  templateUrl: 'adicionar-usuario.html',
})
export class AdicionarUsuarioPage {
  user = {} as User;
  profile = {} as Profile;
  botonActivado:boolean=false;
  rol:string;
  constructor(
    private toast: ToastController,
    private afAuth: AngularFireAuth, public loadingCtrl: LoadingController,
    public events: Events, private afDataBase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarUsuarioPage');
  }
  getbotonActivado(){
    return !this.botonActivado;
  }
  habilitarBoton(){
    if(this.rol==null){
      this.botonActivado=false;
    }
    else{
      this.botonActivado=true;
    }
  }

  async registrar(user: User){
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

      let loader = this.loadingCtrl.create({
        content: 'Registrando...',
        duration: 2500
      });

      loader.present();
      loader.onDidDismiss(() => {
        this.profile.rol=this.rol;
        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDataBase.object(`profile/${auth.uid}`).set(this.profile)
        })
        this.toast.create({
          message: `${user.email} registrado exitosamente`,
          duration: 3000
        }).present();
        this.navCtrl.push('UsuariosPage');

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
