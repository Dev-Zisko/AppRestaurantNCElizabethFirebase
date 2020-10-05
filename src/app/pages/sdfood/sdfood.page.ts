import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicontrollerService, Food } from 'src/app/services/apicontroller.service';

@Component({
  selector: 'app-sdfood',
  templateUrl: './sdfood.page.html',
  styleUrls: ['./sdfood.page.scss'],
})
export class SdfoodPage implements OnInit {

  food: Food = {
    title: '',
    kind: '',
    description: '',
    price: '',
    companions: '',
    image: ''
  }; // Variable to see food in the view

  constructor(private activatedRoute: ActivatedRoute, private apicontrollerService: ApicontrollerService) { }

  ngOnInit() {
  }

  ionViewWillEnter() { // In this method get the id of the selected food and then search in firestore
    try{
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.apicontrollerService.getFood(id).subscribe(food => {
          this.food = food;
        });
      }
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

}
