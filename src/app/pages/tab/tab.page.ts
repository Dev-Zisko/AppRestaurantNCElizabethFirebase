import { Component, OnInit } from '@angular/core';
import { ApicontrollerService, Special, Category } from 'src/app/services/apicontroller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {

  public specials: Observable<Special[]>; // Variable to see specials in the view
  public specials1: Observable<Special[]>; // Variable to see specials in the view
  public categories: Observable<Category[]>; // Variable to see categories in the view
  category: string; // Variable to selected category

  constructor(private apicontrollerService: ApicontrollerService) { }

  ngOnInit() {
    this.category = "";
    this.specials = null;
    this.specials1 = null;
    this.categories = null;
    this.apicontrollerService.isLoggedUser(); // Call method to get status of User
    this.specials = this.apicontrollerService.getSpecials(); // Call method to get all specials
    this.specials1 = this.apicontrollerService.getSpecials1(); // Call method to get all specials
    this.categories = this.apicontrollerService.getCategories(); // Call method to get all categories
  }

  ionViewWillEnter() { // In this method get all specials and categories and then search in firestore
    try{
      this.apicontrollerService.isLoggedUser(); // Call method to get status of User
      this.specials = null;
      this.specials1 = null;
      this.categories = null;
      this.specials = this.apicontrollerService.getSpecials(); // Call method to get all specials
      this.specials1 = this.apicontrollerService.getSpecials1(); // Call method to get all specials
      this.categories = this.apicontrollerService.getCategories(); // Call method to get all categories
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

}
