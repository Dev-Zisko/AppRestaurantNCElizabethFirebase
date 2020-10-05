import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicontrollerService, Food, User } from 'src/app/services/apicontroller.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ddfood',
  templateUrl: './ddfood.page.html',
  styleUrls: ['./ddfood.page.scss'],
})
export class DdfoodPage implements OnInit {

  food: Food = {
    title: '',
    kind: '',
    description: '',
    price: '',
    companions: '',
    image: ''
  }; // Variable to see the food in the view
  isLogged: string; // Variable that indicates if the user is logged in
  public clients: Observable<User[]>; // Variable used to bring the authenticated user

  constructor(private activatedRoute: ActivatedRoute, private apicontrollerService: ApicontrollerService,
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() { // In this method verify that only an administrator user can enter here
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

  ionViewWillEnter() { // In this method get the id of the selected food and then search in firestore
    try{
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.apicontrollerService.getFood(id).subscribe(food => {
          this.food = food;
        });
      }
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

  deleteFood() { // In this method use the food id to remove it from firestore
    try{
      this.apicontrollerService.deleteFood(this.food.id).then(() => {
        this.router.navigateByUrl('/menu/third/dashboard');
        this.showToast('Food removed.');
      }, err => {
        this.showToast('There was a problem removing the food.');
      });
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
