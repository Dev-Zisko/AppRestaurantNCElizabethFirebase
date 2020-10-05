import { Component, OnInit } from '@angular/core';
import { ApicontrollerService, User } from 'src/app/services/apicontroller.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  public user: User = {
    name: '',
    number: '',
    email: '',
    rol: 'User',
    password: ''
  }; // Variable to see the user in the view

  constructor(private apiController: ApicontrollerService, 
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }

  resendEmail(){
    try{
      this.apiController.recoverEmail(this.user); // This method is to recover password of account user
      this.showToast('Please check your email');
      this.router.navigateByUrl('/menu/first');
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
