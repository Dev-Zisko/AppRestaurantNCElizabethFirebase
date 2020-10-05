import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApicontrollerService, Food, Category, User } from 'src/app/services/apicontroller.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-rfood',
  templateUrl: './rfood.page.html',
  styleUrls: ['./rfood.page.scss'],
})

export class RfoodPage implements OnInit {

  food: Food = {
    title: '',
    kind: '',
    description: '',
    price: '',
    companions: '',
    image: ''
  }; // Variable to save the food
  isLogged: string; // Variable that indicates if the user is logged in
  public clients: Observable<User[]>; // Variable used to bring the authenticated user
  public categories: Observable<Category[]>; // Variable to see the food categories in the view
  public uploadPercent: Observable<number>; // Variable indicating the percentage of rise
  public urlImage: Observable<string>; // Variable that stores the path of the selected image

  constructor(private apicontrollerService: ApicontrollerService,
    private toastCtrl: ToastController, private router: Router, private storage: AngularFireStorage) { }

  ngOnInit() { // In this method verify that only an administrator user can enter here
    try{
      this.apicontrollerService.isLoggedUser(); // Call method to get status of User
      this.isLogged = this.apicontrollerService.isLogged;
      if(this.isLogged == "true"){
        this.clients = this.apicontrollerService.searchUser();
      }
      this.categories = this.apicontrollerService.getCategories(); // The method that returns categories is called
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

  addFood() { // In this method use to save that food in firestore
    try{
      if(this.food.title == '' || this.food.kind == '' || this.food.description == '' 
      || this.food.price == '' || this.food.companions == ''){
        this.showToast('Please fill all fields');
      }
      else if(this.food.image == ''){
        this.showToast('Please wait for the image upload');
      }
      else{
        this.apicontrollerService.addFood(this.food).then(() => {
          this.router.navigateByUrl('/menu/third/dashboard');
          this.showToast('Registered food.');
        }, err => {
          this.showToast('There was a problem registering the food.');
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

  onUpload(e){ // In this method edit the food to update it from firestore
    try{
      const id = Math.random().toString(36).substring(2);
      const file = e.target.files[0];
      const filePath = 'images/food_' + id;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe( 
        finalize(() => this.urlImage = ref.getDownloadURL())
      ).subscribe();
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }
}
