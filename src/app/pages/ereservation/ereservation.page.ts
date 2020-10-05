import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicontrollerService, Reservation, User } from 'src/app/services/apicontroller.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ereservation',
  templateUrl: './ereservation.page.html',
  styleUrls: ['./ereservation.page.scss'],
})
export class EreservationPage implements OnInit {

  reservation: Reservation = {
    name: '',
    number: '',
    email: '',
    people: '',
    date: '',
    hour: '',
    status: '',
    comment: ''
  }; // Variable to see the reservation in the view
  isLogged: string; // Variable that indicates if the user is logged in
  public clients: Observable<User[]>; // Variable used to bring the authenticated user

  constructor(private activatedRoute: ActivatedRoute, private apicontrollerService: ApicontrollerService,
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

  ionViewWillEnter() { // In this method get the id of the selected reservation and then search in firestore
    try{
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.apicontrollerService.getReservation(id).subscribe(reservation => {
          this.reservation = reservation;
        });
      }
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

  updateReservation() { // In this method edit the reservation to update it from firestore
    try{
      if(this.reservation.status == ''){
        this.showToast('Please respond to the reservation');
      }
      else{
        this.apicontrollerService.updateReservation(this.reservation).then(() => {
          this.router.navigateByUrl('/menu/third/dashboard');
          this.showToast('Answered reservation.');
        }, err => {
          this.showToast('There was a problem answering the reservation.');
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
