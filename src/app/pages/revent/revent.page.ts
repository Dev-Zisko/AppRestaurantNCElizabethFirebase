import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicontrollerService, Event, User, Category } from 'src/app/services/apicontroller.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-revent',
  templateUrl: './revent.page.html',
  styleUrls: ['./revent.page.scss'],
})
export class ReventPage implements OnInit {

  event: Event = {
    title: '',
    kind: '',
    day: '',
    date: '',
    hour: '',
    description: '',
    image: ''
  }; // Variable to save the event
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

  ngOnInit() { // Some variables are set, in this method verify that only an administrator user can enter here
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

  addEvent() { // In this method use to save that event in firestore
    try{
      if(this.event.title == '' || this.event.description == '' || this.event.kind == ''){
        this.showToast('Please fill all fields');
      }
      else if(this.event.image == ''){
        this.showToast('Please wait for the image upload');
      }
      else if(this.event.kind == 'Destacado' && (this.date == '' || this.hour == '')){
          this.showToast('Please fill date and hour fields');
      }
      else if(this.event.kind != 'Destacado' && this.event.day == ''){
          this.showToast('Please fill day field');
      }
      else{
        if(this.event.kind == 'Destacado'){
          this.convert = this.date.split("-");
          this.convert3 = this.convert[2];
          this.convert4 = this.convert3.split("T");
          this.event.date = this.convert[1] + "/" + this.convert4[0] + "/" + this.convert[0];
          this.convert1 = this.hour.split("T");
          this.convert2 = this.convert1[1];
          this.convert1 = this.convert2.split(":");
          this.event.hour = this.convert1[0] + ":" + this.convert1[1];
        }
        this.apicontrollerService.addEvent(this.event).then(() => {
          this.router.navigateByUrl('/menu/third/dashboard');
          this.showToast('Registered event.');
        }, err => {
          this.showToast('There was a problem registering the event.');
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

  onUpload(e){ // In this method edit the event to update it from firestore
    try{
      const id = Math.random().toString(36).substring(2);
      const file = e.target.files[0];
      const filePath = 'images/event_' + id;
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
