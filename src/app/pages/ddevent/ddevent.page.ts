import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicontrollerService, Event, User, Category } from 'src/app/services/apicontroller.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ddevent',
  templateUrl: './ddevent.page.html',
  styleUrls: ['./ddevent.page.scss'],
})
export class DdeventPage implements OnInit {

  event: Event = {
    title: '',
    kind: '',
    day: '',
    date: '',
    hour: '',
    description: '',
    image: ''
  }; // Variable to see the event in the view
  isLogged: string; // Variable that indicates if the user is logged in
  public clients: Observable<User[]>; // Variable used to bring the authenticated user
  public categories: Observable<Category[]>; // Variable to see the food categories in the view

  constructor(private activatedRoute: ActivatedRoute, private apicontrollerService: ApicontrollerService,
    private toastCtrl: ToastController, private router: Router) { }

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

  ionViewWillEnter() { // In this method get the id of the selected event and then search in firestore
    try{
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.apicontrollerService.getEvent(id).subscribe(event => {
          this.event = event;
        });
      }
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    } 
  }

  deleteEvent() { // In this method use the event id to remove it from firestore
    try{
      this.apicontrollerService.deleteEvent(this.event.id).then(() => {
        this.router.navigateByUrl('/menu/third/dashboard');
        this.showToast('Event removed.');
      }, err => {
        this.showToast('There was a problem removing the event.');
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
