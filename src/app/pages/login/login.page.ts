import { Component, OnInit } from '@angular/core';
import { ApicontrollerService, User } from 'src/app/services/apicontroller.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: User = {
    name: '',
    number: '',
    email: '',
    rol: 'User',
    password: ''
  }; // Variable to see the user in the view
  public isLogged: any; // Variable that saves the user's login status

  constructor(private apiController: ApicontrollerService,
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }

  tryLogin() { // This method verifies if the user has an account and can authenticate in the application
    try{
      if(this.user.email == '' || this.user.password == ''){
        this.showToast('Please fill all fields');
      }
      else if(this.user.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) == null){
        this.showToast('This is not a valid email');
      }
      else if(this.user.password.length < 8){
        this.showToast('This is not a valid password, minimum 8 characters');
      }
      else{
        this.apiController.loginUser(this.user).then(() => {
          this.router.navigateByUrl('/menu/first');
          this.isLogged = true;
          this.showToast('Successful login.');
        }, err => {
          this.showToast('Please check the data are not correct.');
        });
      }
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}
