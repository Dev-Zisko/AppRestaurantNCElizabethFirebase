import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'first',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'second',
        loadChildren: '../register/register.module#RegisterPageModule'
      },
      {
        path: 'third',
        loadChildren: '../login/login.module#LoginPageModule'
      },
      { path: 'third/password',
        loadChildren: '../password/password.module#PasswordPageModule' },
      {
        path: 'third/dashboard',
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'third/dashboard/revent',
        loadChildren: '../revent/revent.module#ReventPageModule'
      },
      {
        path: 'third/dashboard/uevent',
        loadChildren: '../uevent/uevent.module#UeventPageModule'
      },
      {
        path: 'third/dashboard/devent',
        loadChildren: '../devent/devent.module#DeventPageModule'
      },
      {
        path: 'third/dashboard/ddevent',
        loadChildren: '../ddevent/ddevent.module#DdeventPageModule'
      },
      { 
        path: 'third/dashboard/ddevent/:id', 
        loadChildren: '../ddevent/ddevent.module#DdeventPageModule' 
      },
      {
        path: 'third/dashboard/eevent',
        loadChildren: '../eevent/eevent.module#EeventPageModule'
      },
      { 
        path: 'third/dashboard/eevent/:id', 
        loadChildren: '../eevent/eevent.module#EeventPageModule' 
      },
      {
        path: 'third/dashboard/rcategory',
        loadChildren: '../rcategory/rcategory.module#RcategoryPageModule'
      },
      {
        path: 'third/dashboard/ucategory',
        loadChildren: '../ucategory/ucategory.module#UcategoryPageModule'
      },
      {
        path: 'third/dashboard/dcategory',
        loadChildren: '../dcategory/dcategory.module#DcategoryPageModule'
      },
      {
        path: 'third/dashboard/ddcategory',
        loadChildren: '../ddcategory/ddcategory.module#DdcategoryPageModule'
      },
      { 
        path: 'third/dashboard/ddcategory/:id', 
        loadChildren: '../ddcategory/ddcategory.module#DdcategoryPageModule' 
      },
      {
        path: 'third/dashboard/ecategory',
        loadChildren: '../ecategory/ecategory.module#EcategoryPageModule'
      },
      { 
        path: 'third/dashboard/ecategory/:id', 
        loadChildren: '../ecategory/ecategory.module#EcategoryPageModule' 
      },
      {
        path: 'third/dashboard/rfood',
        loadChildren: '../rfood/rfood.module#RfoodPageModule'
      },
      {
        path: 'third/dashboard/ufood',
        loadChildren: '../ufood/ufood.module#UfoodPageModule'
      },
      {
        path: 'third/dashboard/dfood',
        loadChildren: '../dfood/dfood.module#DfoodPageModule'
      },
      {
        path: 'third/dashboard/ddfood',
        loadChildren: '../ddfood/ddfood.module#DdfoodPageModule'
      },
      { 
        path: 'third/dashboard/ddfood/:id', 
        loadChildren: '../ddfood/ddfood.module#DdfoodPageModule' 
      },
      {
        path: 'third/dashboard/efood',
        loadChildren: '../efood/efood.module#EfoodPageModule'
      },
      { 
        path: 'third/dashboard/efood/:id', 
        loadChildren: '../efood/efood.module#EfoodPageModule' 
      },
      {
        path: 'third/dashboard/rspecial',
        loadChildren: '../rspecial/rspecial.module#RspecialPageModule'
      },
      {
        path: 'third/dashboard/uspecial',
        loadChildren: '../uspecial/uspecial.module#UspecialPageModule'
      },
      {
        path: 'third/dashboard/dspecial',
        loadChildren: '../dspecial/dspecial.module#DspecialPageModule'
      },
      {
        path: 'third/dashboard/ddspecial',
        loadChildren: '../ddspecial/ddspecial.module#DdspecialPageModule'
      },
      { 
        path: 'third/dashboard/ddspecial/:id', 
        loadChildren: '../ddspecial/ddspecial.module#DdspecialPageModule' 
      },
      {
        path: 'third/dashboard/especial',
        loadChildren: '../especial/especial.module#EspecialPageModule'
      },
      { 
        path: 'third/dashboard/especial/:id', 
        loadChildren: '../especial/especial.module#EspecialPageModule' 
      },
      {
        path: 'third/dashboard/sreservation',
        loadChildren: '../sreservation/sreservation.module#SreservationPageModule'
      },
      { 
        path: 'third/dashboard/sdreservation/:id', 
        loadChildren: '../sdreservation/sdreservation.module#SdreservationPageModule' 
      },
      {
        path: 'third/dashboard/areservation',
        loadChildren: '../areservation/areservation.module#AreservationPageModule'
      },
      {
        path: 'third/dashboard/dreservation',
        loadChildren: '../dreservation/dreservation.module#DreservationPageModule'
      },
      {
        path: 'third/dashboard/ddreservation',
        loadChildren: '../ddreservation/ddreservation.module#DdreservationPageModule'
      },
      { 
        path: 'third/dashboard/ddreservation/:id', 
        loadChildren: '../ddreservation/ddreservation.module#DdreservationPageModule' 
      },
      {
        path: 'third/dashboard/ereservation',
        loadChildren: '../ereservation/ereservation.module#EreservationPageModule'
      },
      { 
        path: 'third/dashboard/ereservation/:id', 
        loadChildren: '../ereservation/ereservation.module#EreservationPageModule' 
      },
      {
        path: 'fourth',
        loadChildren: '../message/message.module#MessagePageModule'
      },
      {
        path: 'profile',
        loadChildren: '../profile/profile.module#ProfilePageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
