import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Trip} from '../models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:8081/api/trips'

  constructor(private http: HttpClient) {
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }
  createTrip(driverId: number, tripData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/${driverId}`, tripData);
  }

  getTripByDestination(destination:string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${destination}`);
  }
  searchTrips(destination: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiUrl}/search?destination=${destination}`);
  }

}
