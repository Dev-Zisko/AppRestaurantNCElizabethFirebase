import { Component, OnInit } from '@angular/core';
import { ApicontrollerService, Food, User } from 'src/app/services/apicontroller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dfood',
  templateUrl: './dfood.page.html',
  styleUrls: ['./dfood.page.scss'],
})
export class DfoodPage implements OnInit {

  public foods: Observable<Food[]>; // Variable to see the foods in the view
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
      this.foods = this.apicontrollerService.getFoods(); // The method that returns foods is called
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    } 
  }

}
