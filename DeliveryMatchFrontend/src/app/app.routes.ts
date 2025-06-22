import { Routes } from '@angular/router';
import {RegisterComponent} from './components/user/register/register.component';
import {LoginComponent} from './components/user/login/login.component';
import {TripHistoryComponent} from './components/driver/trip-history/trip-history.component';
import {TripPostComponent} from './components/driver/trip-post/trip-post.component';
import {TripRequestComponent} from './components/driver/trip-request/trip-request.component';


import {AuthGuard} from './auth.guard';
import {AppComponent} from './app.component';
import {SendRequestComponent} from './components/sender/send-request/send-request.component';
import {RequestHistoryComponent} from './components/sender/request-history/request-history.component';
import {SearchTripsComponent} from './components/sender/search-trips/search-trips.component';
import {DashboardComponent} from './components/admin/dashboard/dashboard.component';
import {StatsComponent} from './components/admin/stats/stats.component';
import {UserManagementComponent} from './components/admin/user-management/user-management.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'trpis/request', component: TripRequestComponent, canActivate: [AuthGuard], data: { roles: ['CONDUCTEUR'] }},
  {path: 'trpis/history', component: TripHistoryComponent, canActivate: [AuthGuard], data: { roles: ['CONDUCTEUR'] }},
  { path: 'trips', component: TripPostComponent, canActivate: [AuthGuard], data: { roles: ['CONDUCTEUR'] } },
  { path: 'parcels', component: SendRequestComponent, canActivate: [AuthGuard], data: { roles: ['EXPEDITEUR'] } },
  { path: 'parcels/history', component: RequestHistoryComponent, canActivate: [AuthGuard], data: { roles: ['EXPEDITEUR'] } },
  { path: 'parcels/search', component: SearchTripsComponent, canActivate: [AuthGuard], data: { roles: ['EXPEDITEUR'] } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: 'manage', component: UserManagementComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: '**', redirectTo: '' }
];
