import { Component, OnInit } from '@angular/core';
import { ApicontrollerService, Food, Category, User } from 'src/app/services/apicontroller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ufood',
  templateUrl: './ufood.page.html',
  styleUrls: ['./ufood.page.scss'],
})
export class UfoodPage implements OnInit {

  public foods: Observable<Food[]>; // Variable to see foods in the view
  public categories: Observable<Category[]>; // Variable to see categories in the view
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
      this.foods = this.apicontrollerService.getFoods(); // In this call obtain all foods
      this.categories = this.apicontrollerService.getCategories(); // In this call obtain all categories
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

}
