import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicontrollerService, Reservation } from 'src/app/services/apicontroller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sdreservation',
  templateUrl: './sdreservation.page.html',
  styleUrls: ['./sdreservation.page.scss'],
})
export class SdreservationPage implements OnInit {

  reservation: Reservation = {
    name: '',
    number: '',
    email: '',
    people: '',
    date: '',
    hour: '',
    status: '',
    comment: ''
  }; // Variable to see reservation in the view
  public reservations: Observable<Reservation[]>; // Variable to see reservations in the view

  constructor(private activatedRoute: ActivatedRoute, private apicontrollerService: ApicontrollerService) { }

  ngOnInit() {
    this.reservations = this.apicontrollerService.getReservations(); // In this method get all reservations
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

}
