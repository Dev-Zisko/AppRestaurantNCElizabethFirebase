import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicontrollerService, Reservation, User } from 'src/app/services/apicontroller.service';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  reservation: Reservation = {
    name: '',
    number: '',
    email: '',
    people: '',
    date: '',
    hour: '',
    status: '',
    comment: ''
  }; // Variable to save the reservation
  public user: User = {
    name: '',
    number: '',
    email: '',
    rol: 'User',
    password: ''
  }; // Variable to know user logged
  public clients: Observable<User[]>; // Variable to store client logged
  date: any = new Date().toISOString(); // Variable that stores the date of the event
  hour: any = new Date().toISOString(); // Variable that stores the hour of the event
  convert: string[]; // Variable that will be used to convert the selected date to the correct format
  convert3: string; // Variable that will be used to convert the selected date to the correct format
  convert4: string[]; // Variable that will be used to convert the selected date to the correct format
  convert1: string[]; // Variable that will be used to convert the selected hour to the correct format
  convert2: string; // Variable that will be used to convert the selected hour to the correct format
  today = Date.now(); // Variable that obtain date of today
  subject: string; // Variable to save the subject of email
  isLogged: string; // Variable to know if user is logged
  emailAuth: string; // Variable to save the email of user 
  name: string; // Variable to save the name of user
  number: string; // Variable to save the number of user

  constructor(private apicontrollerService: ApicontrollerService,
    private toastCtrl: ToastController, private router: Router) { }

  ngOnInit() { // Some variables set
    this.isLogged = this.apicontrollerService.isLogged;
    this.date = "";
    this.hour = "";
    if(this.isLogged == "true"){
      this.emailAuth = this.apicontrollerService.email;
      this.clients = this.apicontrollerService.searchUser();
      this.clients.forEach(client => {
        this.name = client[0].name;
        this.number = client[0].number;
      });  
    }
  }

  ionViewWillEnter(){ // In this method set the status of user logged
    this.isLogged = this.apicontrollerService.isLogged;
    if(this.isLogged == "true"){
      this.emailAuth = this.apicontrollerService.email;
      this.clients = this.apicontrollerService.searchUser();
      this.clients.forEach(client => {
        this.name = client[0].name;
        this.number = client[0].number;
      });
    }
  }

  addReservation() { // In this method use to save that reservation in firestore
    try{
      if(this.isLogged == "true"){
        this.reservation.email = this.emailAuth;
        this.reservation.name = this.name;
        this.reservation.number = this.number;
      }
      if(this.reservation.name == '' || this.reservation.number == '' || this.reservation.email == '' 
        || this.reservation.people == '' || this.date == '' || this.hour == ''
        || this.reservation.comment == ''){
          this.showToast('Please fill all fields');
      }
      else if(this.reservation.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) == null){
        this.showToast('This is not a valid email');
      }
      else{
      this.convert = this.date.split("-");
      this.convert3 = this.convert[2];
      this.convert4 = this.convert3.split("T");
      this.reservation.date = this.convert[1] + "/" + this.convert4[0] + "/" + this.convert[0];
      this.convert1 = this.hour.split("T");
      this.convert2 = this.convert1[1];
      this.convert1 = this.convert2.split(":");
      this.reservation.hour = this.convert1[0] + ":" + this.convert1[1];
      this.sendEmail();
      this.apicontrollerService.addReservation(this.reservation).then(() => {
          this.router.navigateByUrl('/menu/first/tabs/tab');
          this.showToast('Reservation added');
        }, err => {
          this.showToast('There was a problem adding your reservation :(');
        });
      }
    }
    catch(e){
      alert("Sorry, an application error has occurred."); // Validation in case of an unexpected error
    }
  }

  sendEmail() { // In this method send email to make a reservation in the restaurant
    let message = "Name: " + this.reservation.name + "\n" 
    + "Cellphone Number: " + this.reservation.number + "\n" 
    + "Email Address: " + this.reservation.email + "\n"
    + "Number of People: " + this.reservation.people + "\n"
    + "Date: " + this.reservation.date + "\n"
    + "Hour: " + this.reservation.hour + "\n"
    + "Message: " + this.reservation.comment;
    this.subject = 'NC Elizabeth Reservation';
    this.apicontrollerService.sendEmail(this.subject, message);
  }

  showToast(msg) { // In this method is used to show a toast message
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}