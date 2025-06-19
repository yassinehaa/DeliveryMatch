import { Routes } from '@angular/router';
import {RegisterComponent} from './components/user/register/register.component';
import {LoginComponent} from './components/user/login/login.component';
import {TripHistoryComponent} from './components/driver/trip-history/trip-history.component';
import {TripPostComponent} from './components/driver/trip-post/trip-post.component';
import {TripRequestComponent} from './components/driver/trip-request/trip-request.component';
import {RequestHistoryComponent} from './components/sender/request-history/request-history.component';
import {SearchTripsComponent} from './components/sender/search-trips/search-trips.component';
import {SendRequestComponent} from './components/sender/send-request/send-request.component';


export const routes: Routes = [
  { path: 'register/driver', component: RegisterComponent },
  { path: 'register/shipper', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'driver/trip-history', component: TripHistoryComponent },
  { path: 'driver/trip-post', component: TripPostComponent },
  { path: 'driver/trip-request', component: TripRequestComponent },
  { path: 'sender/request-history', component: RequestHistoryComponent },
  { path: 'sender/search-trips', component: SearchTripsComponent },
  { path: 'sender/send-request', component: SendRequestComponent }];
