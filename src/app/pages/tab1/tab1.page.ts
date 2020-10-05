import { Component, OnInit } from '@angular/core';
import { ApicontrollerService, Event, Category } from 'src/app/services/apicontroller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  public events: Observable<Event[]>; // Variable to see events in the view
  public events1: Observable<Event[]>; // Variable to see events in the view
  public categories: Observable<Category[]>; // Variable to see categories in the view
  category: string; // Variable to selected category

  constructor(private apicontrollerService: ApicontrollerService) { }

  ngOnInit() {
    this.category = "";
    this.events = null;
    this.categories = null;
    this.events = this.apicontrollerService.getEvents(); // Call method to get all events
    this.events1 = this.apicontrollerService.getEvents1(); // Call method to get all events
    this.categories = this.apicontrollerService.getCategories1(); // Call method to get all categories
  }

  ionViewWillEnter() { // In this method get all events and categories and then search in firestore
    try{
      this.events = null;
      this.categories = null;
      this.events = this.apicontrollerService.getEvents(); // Call method to get all events
      this.categories = this.apicontrollerService.getCategories1(); // Call method to get all categories
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

}
