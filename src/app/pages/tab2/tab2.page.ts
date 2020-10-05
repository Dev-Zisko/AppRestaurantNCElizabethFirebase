import { Component, OnInit } from '@angular/core';
import { ApicontrollerService, Food, Category } from 'src/app/services/apicontroller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  public foods: Observable<Food[]>; // Variable to see foods in the view
  public categories: Observable<Category[]>; // Variable to see categories in the view
  category: string; // Variable to selected category

  constructor(private apicontrollerService: ApicontrollerService) { }

  ngOnInit() { // Some variables set
    this.category = "";
    this.foods = null;
    this.categories = null;
    this.foods = this.apicontrollerService.getFoods(); // Call method to get all foods
    this.categories = this.apicontrollerService.getCategories2(); // Call method to get all categories
  }

  ionViewWillEnter() { // In this method get all foods and categories and then search in firestore
    try{
      this.foods = null;
      this.categories = null;
      this.foods = this.apicontrollerService.getFoods(); // Call method to get all foods
      this.categories = this.apicontrollerService.getCategories2(); // Call method to get all categories
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

}
