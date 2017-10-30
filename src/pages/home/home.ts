import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Nav } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { InicioPage } from "../inicio/inicio";
import { PerfilPage } from "../perfil/perfil";
import { MenuController } from 'ionic-angular';
import { Profile } from '../../models/profile';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  activeMenu: string = 'none';
  profileData: FirebaseObjectObservable<Profile>;

  constructor(
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth,private toast: ToastController,
    public navCtrl: NavController,private menu: MenuController, public navParams: NavParams) {
  }
  ionViewWillLoad(){
    this.afAuth.authState.take(1).subscribe(data =>{
    this.profileData = this.afDatabase.object(`profile/${data.uid}`)
    //subscribe obtiene info más especifica
    this.profileData.subscribe(snapshot => {
      console.log(snapshot.rol);
    if(snapshot.rol=="administrador"){
      this.menu.enable(true, 'menu1');
    }else if(snapshot.rol=="profesor"){
      this.menu.enable(true, 'menu2');
    }
    else if(snapshot.rol=="estudiante"){
      this.menu.enable(true, 'menu3');
    }
    });

  })
  }

  ionViewDidLoad() {

  }




}
