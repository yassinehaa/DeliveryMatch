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
  createTrip(driverId: number, trip: { departure: string; destination: string; stopovers: string[]; maxDimensions: string; merchandiseType: string; availableCapacity: number; departureDate: string }): Observable<Trip> {
    return this.http.post<Trip>(`${this.apiUrl}?driverId=${driverId}`, trip);
  }

  getTripByDestination(destination:string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${destination}`);
  }
  searchTrips(destination: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiUrl}/search?destination=${destination}`);
  }

}
