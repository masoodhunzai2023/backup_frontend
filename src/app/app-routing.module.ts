import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import {TakebackupComponent} from './takebackup/takebackup.component';
import { ViewbackupComponent } from './viewbackup/viewbackup.component';
import { RestorebackupComponent } from './restorebackup/restorebackup.component';
import { SettingComponent } from './setting/setting.component';


const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'takebackup', component:TakebackupComponent},
  {path:'viewbackup', component:ViewbackupComponent},
  {path:'restorebackup', component:RestorebackupComponent},
  {path:'setting', component:SettingComponent},


  {path:'home', component:HomeComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    
  ],
 
  exports: [RouterModule]
})
export class AppRoutingModule { }
