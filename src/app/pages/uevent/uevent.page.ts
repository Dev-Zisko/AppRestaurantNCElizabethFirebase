import { Component, OnInit } from '@angular/core';
import { ApicontrollerService, Event, User } from 'src/app/services/apicontroller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-uevent',
  templateUrl: './uevent.page.html',
  styleUrls: ['./uevent.page.scss'],
})
export class UeventPage implements OnInit {

  public events: Observable<Event[]>; // Variable to see events in the view
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
      this.events = this.apicontrollerService.getEvents(); // In this call obtain all events
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }
  
}