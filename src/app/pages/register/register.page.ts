import { Component, OnInit } from '@angular/core';
import { ApicontrollerService, User } from 'src/app/services/apicontroller.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {
    name: '',
    number: '',
    email: '',
    rol: 'User',
    password: ''
  }; // Variable to save the user
  repassword: string; // Variable to check the password

  constructor(private apiController: ApicontrollerService,
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() {
  }
  
  tryRegister() { // In this method use to save that user in firestore
    try{
      if(this.user.name == '' || this.user.number == '' || this.user.email == '' 
      || this.user.password == ''){
        this.showToast('Please fill all fields');
      }
      else if(this.user.password != this.repassword){
        this.showToast('Passwords do not match');
      }
      else if(this.user.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) == null){
        this.showToast('This is not a valid email');
      }
      else if(this.user.password.length < 8){
        this.showToast('This is not a valid password, minimum 8 characters');
      }
      else{
        this.apiController.addUser(this.user).then(() => {
          this.router.navigateByUrl('/menu/first/tabs/tab');
          this.apiController.addUserFirebase(this.user);
          this.showToast('User registered successfully.');
        }, err => {
          this.showToast('There was an error creating your account, you may already be registered.');
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
