import { User } from 'src/app/services/apicontroller.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
 
const LNG_KEY = 'SELECTED_LANGUAGE';

export interface User {
  id?: string,
  name: string,
  number: string,
  email: string,
  rol: string,
  password: string
}; // Object User

export interface Event {
  id?: string,
  title: string,
  kind: string,
  day: string,
  date: string,
  hour: string,
  description: string,
  image: string
}; // Object Event

export interface Category {
  id?: string,
  name: string,
  kind: string
}; // Object Category

export interface Food {
  id?: string,
  title: string,
  kind: string,
  description: string,
  price: string,
  companions: string,
  image: string
}; // Object Food

export interface Special {
  id?: string,
  title: string,
  kind: string,
  day: string,
  date: string,
  hour: string,
  description: string,
  extra: string,
  price: string,
  image: string
}; // Object Special

export interface Reservation {
  id?: string,
  name: string,
  number: string,
  email: string,
  people: string,
  date: string,
  hour: string,
  status: string,
  comment: string
}; // Object Reservation
 
@Injectable({
  providedIn: 'root'
})
export class ApicontrollerService {

  private clients: Observable<User[]>; // Variable to store the clients
  private users: Observable<User[]>; // Variable to store the users
  private events: Observable<Event[]>; // Variable to store the events
  private categories: Observable<Category[]>; // Variable to store the categories
  private categories1: Observable<Category[]>; // Variable to store the categories
  private categories2: Observable<Category[]>; // Variable to store the categories
  private foods: Observable<Food[]>; // Variable to store the foods
  private specials: Observable<Special[]>; // Variable to store the specials
  private reservations: Observable<Reservation[]>; // Variable to store the reservations
  private specials1: Observable<Special[]>; // Variable to store the specials
  private events1: Observable<Event[]>; // Variable to store the events

  private clientCollection: AngularFirestoreCollection<User>; // Collections to store the clients
  private userCollection: AngularFirestoreCollection<User>; // Collections to store the users
  private eventCollection: AngularFirestoreCollection<Event>; // Collections to store the events
  private categoryCollection: AngularFirestoreCollection<Category>; // Collections to store the categories
  private foodCollection: AngularFirestoreCollection<Food>; // Collections to store the foods
  private specialCollection: AngularFirestoreCollection<Special>; // Collections to store the specials
  private reservationCollection: AngularFirestoreCollection<Reservation>; // Collections to store the reservations
  private special1Collection: AngularFirestoreCollection<Special>; // Collections to store the specials
  private event1Collection: AngularFirestoreCollection<Event>; // Collections to store the events

  public isLogged: string; // Variable to store the status of user
  public email: string; // Variable to store the email of user
  selected = ''; // Variable to store of language selected

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth, private translate: TranslateService, private storage: Storage, private plt: Platform, public emailComposer: EmailComposer) {
    try{
    this.userCollection = this.afs.collection<User>('users'); // Query of users
    this.eventCollection = this.afs.collection('events', ref => ref.orderBy('date', 'asc')); // Query of events
    this.categoryCollection = this.afs.collection('categories', ref => ref.orderBy('name', 'asc')); // Query of categories
    this.foodCollection = this.afs.collection('foods', ref => ref.orderBy('title', 'asc')); // Query of foods
    this.specialCollection = this.afs.collection('specials', ref => ref.orderBy('date', 'asc')); // Query of specials
    this.reservationCollection = this.afs.collection('reservations', ref => ref.orderBy('date', 'asc')); // Query of reservations
    this.special1Collection = this.afs.collection('specials', ref => ref.orderBy('day', 'asc')); // Query of specials
    this.event1Collection = this.afs.collection('events', ref => ref.orderBy('day', 'asc')); // Query of events

    this.users = this.userCollection.snapshotChanges().pipe( // Obtain the data of firestore (Users)
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

      this.events = this.eventCollection.snapshotChanges().pipe( // Obtain the data of firestore (Events)
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

      this.events1 = this.event1Collection.snapshotChanges().pipe( // Obtain the data of firestore (Events)
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

      this.categories = this.categoryCollection.snapshotChanges().pipe( // Obtain the data of firestore (Categories)
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

      this.categories1 = this.categoryCollection.snapshotChanges().pipe( // Obtain the data of firestore (Categories)
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

      this.categories2 = this.categoryCollection.snapshotChanges().pipe( // Obtain the data of firestore (Categories)
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

      this.foods = this.foodCollection.snapshotChanges().pipe( // Obtain the data of firestore (Foods)
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

      this.specials = this.specialCollection.snapshotChanges().pipe( // Obtain the data of firestore (Specials)
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

      this.specials1 = this.special1Collection.snapshotChanges().pipe( // Obtain the data of firestore (Specials)
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

      this.reservations = this.reservationCollection.snapshotChanges().pipe( // Obtain the data of firestore (Reservations)
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }
    catch(e){
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  searchUser(): Observable<User[]>{ // In this method search the user logged
    try{
      this.clientCollection = this.afs.collection('users', ref => ref.where('email', '==', this.email));
      this.clients = this.clientCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
      return this.clients;
    }
    catch(e){
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  addUser(value){ // In this method save a user
    try{
      return new Promise<any>((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
          .then(res => {
            this.email = value.email;
            resolve(res);
          }, err => reject(err));
      });
    }
    catch(e){
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  loginUser(value){ // In this method login a user
    try{
      return new Promise<any>((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(value.email, value.password)
          .then(res => {
            this.isLogged = "true";
            this.email = value.email;
            resolve(res);
          }, err => reject(err));
      });
    }
    catch(e){
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  async logoutUser(): Promise<any> { // In this method the user is logout
    try {
      this.isLogged = "false";
      return await firebase.auth().signOut();
    } catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  isLoggedUser(){ // In this method obtain the status of 
    try{
      return new Promise<any>((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user: firebase.User) => {
          if (user) {
            this.email = user.email;
            this.isLogged = "true";
            resolve(true);
          } else {
            this.email = '';
            this.isLogged = "false";
            resolve(false);
          }
        });
      });
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  recoverEmail(value){ // In this method the user can recovery password
    try{
      return new Promise<any>((resolve, reject) => {
        firebase.auth().sendPasswordResetEmail(value.email).then(res => {
          this.isLogged = "true";
          console.log(this.isLogged);
          resolve(res);
        }, err => reject(err));
      });
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  addUserFirebase(user: User): Promise<DocumentReference> { // In this method add user in firebase
    try{
      return this.userCollection.add(user);
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  getUsers(): Observable<User[]> { // In this method get all users of firebase
    try{
      return this.users;
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  updateUser(user: User): Promise<void> { // In this method update a user in firebase
    try{
      return this.userCollection.doc(user.id).update({ 
        name: user.name, number: user.number });
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  deleteUser(id: string): Promise<void> { // In this method delete a user in firebase
    try{
      return this.userCollection.doc(id).delete();
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  addEvent(event: Event): Promise<DocumentReference> { // In this method add event in firebase
    try{
      return this.eventCollection.add(event);
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  updateEvent(event: Event): Promise<void> { // In this method update a event in firebase
    try{
      return this.eventCollection.doc(event.id).update({ 
        title: event.title, kind: event.kind, day: event.day, date: event.date, hour: event.hour, description: event.description, image: event.image });
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  deleteEvent(id: string): Promise<void> { // In this method delete a event in firebase
    try{
      return this.eventCollection.doc(id).delete();
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  getEvents(): Observable<Event[]> { // In this method get all events of firebase
    try{
      return this.events;
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  getEvents1(): Observable<Event[]> { // In this method get all events of firebase
    try{
      return this.events1;
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  getEvent(id: string): Observable<Event> { // In this method get a event of firebase
    try{
      return this.eventCollection.doc<Event>(id).valueChanges().pipe(
        take(1),
        map(event => {
          event.id = id;
          return event
        })
      );
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  addCategory(category: Category): Promise<DocumentReference> { // In this method add category in firebase
    try{
      return this.categoryCollection.add(category);
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  updateCategory(category: Category): Promise<void> { // In this method update a category in firebase
    try{
      return this.categoryCollection.doc(category.id).update({ 
        name: category.name, kind: category.kind });
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  deleteCategory(id: string): Promise<void> { // In this method delete a category in firebase
    try{
      return this.categoryCollection.doc(id).delete();
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  getCategories(): Observable<Category[]> { // In this method get all categories of firebase
    try{
      return this.categories;
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  getCategories1(): Observable<Category[]> { // In this method get all categories of firebase
    try{
      return this.categories1;
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  getCategories2(): Observable<Category[]> { // In this method get all categories of firebase
    try{
      return this.categories2;
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  getCategory(id: string): Observable<Category> { // In this method get a category of firebase
    try{
      return this.categoryCollection.doc<Category>(id).valueChanges().pipe(
        take(1),
        map(category => {
          category.id = id;
          return category
        })
      );  
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  addFood(food: Food): Promise<DocumentReference> { // In this method add food in firebase
    try{
      return this.foodCollection.add(food);
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  updateFood(food: Food): Promise<void> { // In this method update a food in firebase
    try{
      return this.foodCollection.doc(food.id).update({ 
        title: food.title, kind: food.kind, description: food.description, 
        price: food.price, companions: food.companions, image: food.image });
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  deleteFood(id: string): Promise<void> { // In this method delete a food in firebase
    try{
      return this.foodCollection.doc(id).delete();
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  getFoods(): Observable<Food[]> { // In this method get all foods of firebase
    try{
      return this.foods;
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  getFood(id: string): Observable<Food> { // In this method get a food of firebase
    try{
      return this.foodCollection.doc<Food>(id).valueChanges().pipe(
        take(1),
        map(food => {
          food.id = id;
          return food
        })
      );
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  addSpecial(special: Special): Promise<DocumentReference> { // In this method add special in firebase
    try{
      return this.specialCollection.add(special);
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  updateSpecial(special: Special): Promise<void> { // In this method update a special in firebase
    try{
      return this.specialCollection.doc(special.id).update({ 
        title: special.title, kind: special.kind, day: special.day, date: special.date, hour: special.hour,
        extra: special.extra, description: special.description, 
        price: special.price, image: special.image });
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  deleteSpecial(id: string): Promise<void> { // In this method delete a special in firebase
    try{
      return this.specialCollection.doc(id).delete();
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  getSpecials(): Observable<Special[]> { // In this method get all specials of firebase
    try{
      return this.specials;
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  getSpecials1(): Observable<Special[]> { // In this method get all specials of firebase
    try{
      return this.specials1;
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  getSpecial(id: string): Observable<Special> { // In this method get a special of firebase
    try{
      return this.specialCollection.doc<Special>(id).valueChanges().pipe(
        take(1),
        map(special => {
          special.id = id;
          return special
        })
      );
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    } 
  }

  addReservation(reservation: Reservation): Promise<DocumentReference> { // In this method add reservation in firebase
    try{
      return this.reservationCollection.add(reservation);
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    } 
  }

  updateReservation(reservation: Reservation): Promise<void> { // In this method update a reservation in firebase
    try{
      return this.reservationCollection.doc(reservation.id).update({ 
        name: reservation.name, number: reservation.number, email: reservation.email, 
        people: reservation.people, date: reservation.date, hour: reservation.hour, 
        status: reservation.status, comment: reservation.comment
       });
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    } 
  }

  deleteReservation(id: string): Promise<void> { // In this method delete a reservation in firebase
    try{
      return this.reservationCollection.doc(id).delete();
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    } 
  }

  getReservations(): Observable<Reservation[]> { // In this method get all reservations of firebase
    try{
      return this.reservations;
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }
  
  getReservation(id: string): Observable<Reservation> { // In this method get a reservation of firebase
    try{
      return this.reservationCollection.doc<Reservation>(id).valueChanges().pipe(
        take(1),
        map(reservation => {
          reservation.id = id;
          return reservation
        })
      );
    }
    catch (e) {
      alert("Sorry, there are problems with the conection."); // Validation in case of an unexpected error
    }
  }

  setInitialAppLanguage() { // In this method settted the language of application
    try{
      let language = this.translate.getBrowserLang();
      this.translate.setDefaultLang(language);
      this.storage.get(LNG_KEY).then(val => {
        if (val) {
          this.setLanguage(val);
          this.selected = val;
        }
      });
    }
    catch (e) {
      alert("Sorry, there are problems with the language."); // Validation in case of an unexpected error
    }
  }
 
  getLanguages() { // In this method obtain the diferents languages
    try{
      return [
        { text: 'English', value: 'en', img: 'assets/imgs/en.png' },
        { text: 'Spanish', value: 'es', img: 'assets/imgs/es.png' },
      ];
    }
    catch (e) {
      alert("Sorry, there are problems with the language."); // Validation in case of an unexpected error
    }
  }

  setLanguage(lng) { // In this method set language
    try{
      this.translate.use(lng);
      this.selected = lng;
      this.storage.set(LNG_KEY, lng);
    }
    catch (e) {
      alert("Sorry, there are problems with the language."); // Validation in case of an unexpected error
    }
  }

  sendEmail(subject, emailInfo) { // In this method send email to make a reservation
    try{
      let email = {
        to: 'nochesdecolombiaelizabeth@gmail.com',
        cc: '',
        bcc: [],
        attachments: [],
        subject: subject,
        body: emailInfo
      }
      // Send a text message using default options
      this.emailComposer.open(email);
    }
    catch (e) {
      alert("Sorry, there are problems with send email."); // Validation in case of an unexpected error
    }
  }
  
}
