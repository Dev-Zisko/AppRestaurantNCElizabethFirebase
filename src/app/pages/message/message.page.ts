import { Component, OnInit } from '@angular/core';
import { ApicontrollerService, Reservation } from 'src/app/services/apicontroller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  public reservations: Observable<Reservation[]>; // Variable to see the food reservations in the view
  public emailAuth: string; // Variable that store the email of the logged in user

  constructor(private apicontrollerService: ApicontrollerService) { }

  ngOnInit() { // Some variables are set
    this.emailAuth = this.apicontrollerService.email;
    this.reservations = this.apicontrollerService.getReservations(); // The method that returns reservations is called
  }

}
