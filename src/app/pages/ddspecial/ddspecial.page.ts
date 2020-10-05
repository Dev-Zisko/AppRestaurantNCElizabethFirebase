import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicontrollerService, Special, User } from 'src/app/services/apicontroller.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ddspecial',
  templateUrl: './ddspecial.page.html',
  styleUrls: ['./ddspecial.page.scss'],
})
export class DdspecialPage implements OnInit {

  special: Special = {
    title: '',
    kind: '',
    day: '',
    date: '',
    hour: '',
    description: '',
    extra: '',
    price: '',
    image: ''
  }; // Variable to see the special in the view
  isLogged: string; // Variable that indicates if the user is logged in
  public clients: Observable<User[]>; // Variable used to bring the authenticated user

  constructor(private activatedRoute: ActivatedRoute, private apicontrollerService: ApicontrollerService,
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() { // In this method verify that only an administrator user can enter here
    try{
      this.apicontrollerService.isLoggedUser(); // Call method to get status of User
      this.isLogged = this.apicontrollerService.isLogged;
      if(this.isLogged == "true"){
        this.clients = this.apicontrollerService.searchUser();
      }
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

  ionViewWillEnter() { // In this method get the id of the selected special and then search in firestore
    try{
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.apicontrollerService.getSpecial(id).subscribe(special => {
          this.special = special;
        });
      }
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

  deleteSpecial() { // In this method use the special id to remove it from firestore
    try{
      this.apicontrollerService.deleteSpecial(this.special.id).then(() => {
        this.router.navigateByUrl('/menu/third/dashboard');
        this.showToast('Special removed.');
      }, err => {
        this.showToast('There was a problem removing the special.');
      });
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }
 
  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
