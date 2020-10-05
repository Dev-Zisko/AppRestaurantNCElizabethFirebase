import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicontrollerService, Special, Category, User } from 'src/app/services/apicontroller.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-rspecial',
  templateUrl: './rspecial.page.html',
  styleUrls: ['./rspecial.page.scss'],
})
export class RspecialPage implements OnInit {

  special: Special = {
    title: '',
    kind: '',
    day: '',
    date: '',
    hour: '',
    description: '',
    extra: '',
    price: '',
    image: ''
  }; // Variable to save the special
  isLogged: string; // Variable that indicates if the user is logged in
  public clients: Observable<User[]>; // Variable used to bring the authenticated user
  public categories: Observable<Category[]>; // Variable to see the food categories in the view
  date: any = new Date().toISOString(); // Variable that stores the date of the event
  hour: any = new Date().toISOString(); // Variable that stores the hour of the event
  convert: string[]; // Variable that will be used to convert the selected date to the correct format
  convert3: string; // Variable that will be used to convert the selected date to the correct format
  convert4: string[]; // Variable that will be used to convert the selected date to the correct format
  convert1: string[]; // Variable that will be used to convert the selected hour to the correct format
  convert2: string; // Variable that will be used to convert the selected hour to the correct format
  today = Date.now(); // Variable that obtain date of today
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
      this.date = "";
      this.hour = "";
      this.categories = this.apicontrollerService.getCategories(); // The method that returns categories is called
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }
  
  addSpecial() { // In this method use to save that special in firestore
    try{
      if(this.special.title == '' || this.special.kind == '' || this.special.description == ''){
        this.showToast('Please fill all fields');
      }
      else if(this.special.image == ''){
        this.showToast('Please wait for the image upload');
      }
      else if(this.special.kind == 'Destacado' && (this.date == '' || this.hour == '')){
        this.showToast('Please fill date and hour fields');
      }
      else if(this.special.kind != 'Destacado' && this.special.day == ''){
          this.showToast('Please fill day field');
      }
      else{
        if(this.special.kind == 'Destacado'){
          this.convert = this.date.split("-");
          this.convert3 = this.convert[2];
          this.convert4 = this.convert3.split("T");
          this.special.date = this.convert[1] + "/" + this.convert4[0] + "/" + this.convert[0];
          this.convert1 = this.hour.split("T");
          this.convert2 = this.convert1[1];
          this.convert1 = this.convert2.split(":");
          this.special.hour = this.convert1[0] + ":" + this.convert1[1];
        }
        this.apicontrollerService.addSpecial(this.special).then(() => {
          this.router.navigateByUrl('/menu/third/dashboard');
          this.showToast('Registered special.');
        }, err => {
          this.showToast('There was a problem registering the special.');
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
      const filePath = 'images/special_' + id;
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
