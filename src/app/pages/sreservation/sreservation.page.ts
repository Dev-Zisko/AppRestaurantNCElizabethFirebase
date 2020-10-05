import { Component, OnInit } from '@angular/core';
import { ApicontrollerService, Reservation, User } from 'src/app/services/apicontroller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sreservation',
  templateUrl: './sreservation.page.html',
  styleUrls: ['./sreservation.page.scss'],
})
export class SreservationPage implements OnInit {

  public reservations: Observable<Reservation[]>; // Variable to see reservations in the view
  isLogged: string; // Variable that indicates if the user is logged in
  public clients: Observable<User[]>; // Variable used to bring the authenticated user

  constructor(private apicontrollerService: ApicontrollerService) { }

  ngOnInit() { // In this method verify that only an administrator user can enter here
    try{
      this.apicontrollerService.isLoggedUser(); // Call method to get status of User
      this.isLogged = this.apicontrollerService.isLogged;
      if(this.isLogged == "true"){
        this.clients = this.apicontrollerService.searchUser();
      }
      this.reservations = this.apicontrollerService.getReservations(); // Call method to get all reservations
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

}
