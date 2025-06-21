import { Routes } from '@angular/router';
import {RegisterComponent} from './components/user/register/register.component';
import {LoginComponent} from './components/user/login/login.component';
import {TripHistoryComponent} from './components/driver/trip-history/trip-history.component';
import {TripPostComponent} from './components/driver/trip-post/trip-post.component';
import {TripRequestComponent} from './components/driver/trip-request/trip-request.component';


import {AuthGuard} from './auth.guard';
import {AppComponent} from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'trips', component: TripPostComponent, canActivate: [AuthGuard], data: { roles: ['CONDUCTEUR'] } },
  { path: 'parcels', component: TripRequestComponent, canActivate: [AuthGuard], data: { roles: ['CONDUCTEUR', 'EXPEDITEUR'] } },
  { path: '**', redirectTo: '' }
];
