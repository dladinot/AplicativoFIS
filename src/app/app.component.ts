import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InicioPage } from '../pages/inicio/inicio';
import { PerfilPage } from '../pages/perfil/perfil';
import { HomePage } from '../pages/home/home';
import { UsuariosPage } from '../pages/usuarios/usuarios';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('NAV') nav: Nav;
  public paginasAdmin: Array<{title: string, component: any, icon: string}>;
  public rootPage:any;

  constructor(platform: Platform, private loadingCtrl: LoadingController,  statusBar: StatusBar, splashScreen: SplashScreen) {
  this.rootPage = InicioPage;

  this.paginasAdmin = [
    {title: 'Home',  component: HomePage, icon: 'home'},
    {title: 'Perfil',  component: PerfilPage, icon: 'person'},
    {title: 'Usuarios',  component: UsuariosPage, icon: 'people'}
  ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToPage(page){
    let loader = this.loadingCtrl.create({
      duration: 500
    });
    loader.present();
    this.nav.setRoot(page);
  }

}
