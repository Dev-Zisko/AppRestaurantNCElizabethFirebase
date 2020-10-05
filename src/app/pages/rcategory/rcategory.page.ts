import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicontrollerService, Category, User } from 'src/app/services/apicontroller.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rcategory',
  templateUrl: './rcategory.page.html',
  styleUrls: ['./rcategory.page.scss'],
})
export class RcategoryPage implements OnInit {

  category: Category = {
    name: '',
    kind: ''
  }; // Variable to save the category
  isLogged: string; // Variable that indicates if the user is logged in
  public clients: Observable<User[]>; // Variable used to bring the authenticated user

  constructor(private apicontrollerService: ApicontrollerService,
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() { // Some variables are set, in this method verify that only an administrator user can enter here
    try{
      this.apicontrollerService.isLoggedUser(); // Call method to get status of User
      this.isLogged = this.apicontrollerService.isLogged;
      if(this.isLogged == "true"){
        this.clients = this.apicontrollerService.searchUser();
      }
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

  addCategory() { // In this method use to save that category in firestore
    try{
      if(this.category.name == '' || this.category.kind == ''){
        this.showToast('Please fill all fields');
      }
      else{
        this.apicontrollerService.addCategory(this.category).then(() => {
          this.router.navigateByUrl('/menu/third/dashboard');
          this.showToast('Category Created.');
        }, err => {
          this.showToast('There was a problem creating the category.');
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
