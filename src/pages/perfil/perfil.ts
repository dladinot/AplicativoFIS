import { Profile } from '../../models/profile';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  nombre: string;
  apellido: string;
  correoPersonal: string;
  proyectoCurricular: string;
  telefono: string;

  profile = {} as Profile;
  previusProfile = {} as Profile;
  profileData: FirebaseObjectObservable<Profile>
  boolInputs: boolean;


  userID:string;



  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams) {


      this.afAuth.authState.subscribe(data => {

        this.profileData = this.afDatabase.object(`profile/${data.uid}`, {preserveSnapshot: true});
        this.profileData.subscribe(data => {
          this.setData(data);
        })

      })


  }
  ionViewWillLoad(){

  this.afAuth.authState.take(1).subscribe(data =>{
    this.userID=data.uid;
    this.profileData = this.afDatabase.object(`profile/${data.uid}`)
    //subscribe obtiene info más especifica

    //disponible tarda en cargarse por ello sale undefined primero y en unos segundos se asigna la variable

  })


}


  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  setData(data) {
    this.nombre = data.val().nombre;
    this.apellido = data.val().apellido;
    this.correoPersonal = data.val().correoPersonal;
    this.proyectoCurricular = data.val().proyectoCurricular;
    this.telefono = data.val().telefono;

  }



}
