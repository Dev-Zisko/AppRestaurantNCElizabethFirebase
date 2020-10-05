import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicontrollerService, Food, Category, User } from 'src/app/services/apicontroller.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-efood',
  templateUrl: './efood.page.html',
  styleUrls: ['./efood.page.scss'],
})
export class EfoodPage implements OnInit {

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
  public categories: Observable<Category[]>; // Variable to see the food categories in the view
  public uploadPercent: Observable<number>; // Variable indicating the percentage of rise
  public urlImage: Observable<string>; // Variable that stores the path of the selected image
  upload: string; // Variable to determine if the image will be edited
  notify: any; // Variable to notify a change of image editing
  image: string; // Variable that stores the selected image

  constructor(private activatedRoute: ActivatedRoute, private apicontrollerService: ApicontrollerService,
    private toastCtrl: ToastController, private router: Router, private storage: AngularFireStorage) { }

  ngOnInit() { // Some variables are set, , in this method verify that only an administrator user can enter here
    try{
      this.apicontrollerService.isLoggedUser(); // Call method to get status of User
      this.isLogged = this.apicontrollerService.isLogged;
      if(this.isLogged == "true"){
        this.clients = this.apicontrollerService.searchUser();
      }
      this.categories = this.apicontrollerService.getCategories(); // The method that returns categories is called
      this.upload = "false";
      this.image = "";
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

  updateFood() { // In this method edit the food to update it from firestore
    try{
      if(this.food.title == '' || this.food.kind == '' || this.food.description == '' 
      || this.food.price == '' || this.food.companions == ''){
        this.showToast('Please fill all fields');
      }
      else if(this.image == '' && this.upload == "true"){
        this.showToast('Please wait for the image upload');
      }
      else{
        if(this.upload == "true"){
          this.food.image = this.image;
        }
        this.apicontrollerService.updateFood(this.food).then(() => {
          this.router.navigateByUrl('/menu/third/dashboard');
          this.showToast('Updated food.');
        }, err => {
          this.showToast('There was a problem updating your food.');
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

  onUpload(e){ // In this method the selected image is uploaded to the firestorage
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

  select(notify) { // This method indicates whether or not to edit the image
    if(notify == true){
      this.upload = "true";
    } 
    else if(notify == false){
      this.upload = "false";
    }
  }

}
