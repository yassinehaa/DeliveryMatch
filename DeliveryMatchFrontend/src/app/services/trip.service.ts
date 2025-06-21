import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Trip } from '../models/trip.model';
import { AuthService } from './auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) {}

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
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No authentication token available');
    }
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    console.log('Creating trip with headers:', { Authorization: headers.get('Authorization') });
    return this.http.post<TripDTO>(`${this.apiUrl}/create`, tripData, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Trip creation error:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          error: error.error,
          message: error.message,
          headers: error.headers
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
