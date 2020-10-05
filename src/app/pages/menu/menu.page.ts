import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { ApicontrollerService, User } from 'src/app/services/apicontroller.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = ''; // Variable indicating the selected route
  notify: any; // Variable to notify a change of language
  isLogged: string; // Variable that indicates if the user is logged in
  languages = []; // Variable that indicates of languages
  selected = ''; // Variable indicating the selected in the view
  public user: User = {
    name: '',
    number: '',
    email: '',
    rol: 'User',
    password: ''
  }; // Variable to see the user in the view
  public clients: Observable<User[]>; // Variable used to bring the authenticated user
  pagesnotLogged = [
    {
      title: 'Home',
      url: '/menu/first'
    },
    {
      title: 'Registro',
      url: '/menu/second'
    },
    {
      title: 'Login',
      url: '/menu/third'
    },
  ]; // Variable that stores the menu pages
  pagesLogged = [
    {
      title: 'Home',
      url: '/menu/first'
    },
    {
      title: 'Mis mensajes',
      url: '/menu/fourth'
    },
    {
      title: 'Mi perfil',
      url: '/menu/profile'
    },
    {
      title: 'Salir',
      url: '/logout'
    }
  ]; // Variable that stores the menu pages
  pagesLoggedAdmin = [
    {
      title: 'Home',
      url: '/menu/first'
    },
    {
      title: 'Dashboard',
      url: '/menu/third/dashboard'
    },
    {
      title: 'Salir',
      url: '/logout'
    }
  ]; // Variable that stores the menu pages
 
  constructor(private translate: TranslateService, private toastCtrl: ToastController, 
    private router: Router, private apiController: ApicontrollerService) {
    this.router.events.subscribe((event: RouterEvent) => { // This method indicating the selected route
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() { // Some variables are set
    try{
      this.languages = this.apiController.getLanguages();
      this.selected = this.apiController.selected;
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

  statusLogged(){ // This method verifies the logging status
    try{
      this.isLogged = this.apiController.isLogged;
      if(this.isLogged == "true"){
        this.clients = this.apiController.searchUser();
      }
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }
 
  select(notify) { // This method indicates the language of aplication
    if(notify == true){
      this.apiController.setLanguage('en');
    } else if(notify == false){
      this.apiController.setLanguage('es');
    }
  }

  tryLogout() { // This method is used to log out of the user's account.
    try{
      this.apiController.logoutUser().then(() => {
        this.showToast('User logout');
      }, err => {
        this.showToast('There was a problem adding your user :(');
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