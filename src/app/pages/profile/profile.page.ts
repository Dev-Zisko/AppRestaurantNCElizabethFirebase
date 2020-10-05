import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicontrollerService, User } from 'src/app/services/apicontroller.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public user: User = {
    name: '',
    number: '',
    email: '',
    rol: 'User',
    password: ''
  }; // Variable to know user logged
  public clients: Observable<User[]>; // Variable to store client logged
  isLogged: string; // Variable to know if user is logged
  emailAuth: string; // Variable to save the email of user 
  id: string; // Variable to save the id of user
  name: string; // Variable to save the name of user
  number: string; // Variable to save the number of user

  constructor(private apicontrollerService: ApicontrollerService,
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() { // Some variables set
    this.isLogged = this.apicontrollerService.isLogged;
    if(this.isLogged == "true"){
      this.emailAuth = this.apicontrollerService.email;
      this.clients = this.apicontrollerService.searchUser();
      this.clients.forEach(client => {
        this.id = client[0].id;
        this.name = client[0].name;
        this.number = client[0].number;
      });  
    }
  }

  ionViewWillEnter(){ // In this method set the status of user logged
    this.isLogged = this.apicontrollerService.isLogged;
    if(this.isLogged == "true"){
      this.emailAuth = this.apicontrollerService.email;
      this.clients = this.apicontrollerService.searchUser();
      this.clients.forEach(client => {
        this.id = client[0].id;
        this.name = client[0].name;
        this.number = client[0].number;
      });
    }
  }

  updateUser() { // In this method edit the user to update it from firestore
    try{
      if(this.user.name == '' || this.user.number == ''){
        this.showToast('Please fill all fields');
      }
      else{
        this.user.id = this.id;
        this.apicontrollerService.updateUser(this.user).then(() => {
          this.router.navigateByUrl('/menu/first/tabs/tab');
          this.showToast('Data updated successfully');
        }, err => {
          this.showToast('There was a problem updating the user.');
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
