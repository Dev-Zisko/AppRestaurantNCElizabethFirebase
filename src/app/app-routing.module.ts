import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu/first', pathMatch: 'full' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'logout', redirectTo: 'menu/first', pathMatch: 'full' },
  { path: 'sdreservation/:id', loadChildren: './pages/sdreservation/sdreservation.module#SdreservationPageModule' },
  { path: 'menu/first/tabs/tab2/sdfood/:id', loadChildren: './pages/sdfood/sdfood.module#SdfoodPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
