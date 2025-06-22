import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Trip } from '../models/trip.model';

interface CreateTripDTO {
  departure: string;
  destination: string;
  stopovers: string[];
  maxDimensions: string;
  merchandiseType: string;
  availableCapacity: number;
  departureDate: string;
}

interface TripDTO {
  id: number;
  departure: string;
  destination: string;
  stopovers: string[];
  maxDimensions: string;
  merchandiseType: string;
  availableCapacity: number;
  departureDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:8081/api/trips';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<TripDTO[]>(`${this.apiUrl}`).pipe(
      map(dtoTrips => dtoTrips.map(dto => ({
        ...dto,
        driver: null,
        requests: []
      })))
    );
  }

  createTrip(tripData: CreateTripDTO): Observable<TripDTO> {
    console.log('TripService: Submitting payload:', JSON.stringify(tripData, null, 2));
    return this.http.post<TripDTO>(`${this.apiUrl}/create`, tripData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('TripService: Error creating trip:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          error: error.error,
          message: error.message,
          headers: error.headers,
          requestBody: JSON.stringify(tripData, null, 2)
        });
        throw error;
      })
    );
  }

  searchTrips(destination: string): Observable<Trip[]> {
    return this.http.get<TripDTO[]>(`${this.apiUrl}/search?destination=${destination}`).pipe(
      map(dtoTrips => dtoTrips.map(dto => ({
        ...dto,
        driver: null,
        requests: []
      })))
    );
  }
}
