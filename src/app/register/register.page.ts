import { Component, OnInit } from '@angular/core';
import { User} from "../models/user.models";
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  async register(user: User){
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: 'Espere por favor...'
      })
      await loader.present();

      try {
        await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(data =>{
          console.log(data);

          this.navCtrl.navigateRoot("home")
        })
      } catch (e:any) {
          e.message = "Error al registrarse";
          let errorMessage = e.message || e.getLocalizedMessage();

          this.showToast(errorMessage)
      }

      await loader.dismiss();
    }
  }

  formValidation(){
    if(!this.user.email){
      this.showToast("Ingrese un email");
      return false;
    }
    if(!this.user.password){
      this.showToast("Ingrese una clave");
      return false;
    }

    return true;
  }

  showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toasData => toasData.present());
  }


}
