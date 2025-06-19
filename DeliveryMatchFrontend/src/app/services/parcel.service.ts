import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParcelRequest} from '../models/parcel-request.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {
 private apiUrl = 'http://localhost:8081/api/parcels'
  constructor(private http: HttpClient) { }
  sendRequest(senderId: number, request: { tripId: number; dimensions: string; weight: number; type: string }): Observable<ParcelRequest> {
    return this.http.post<ParcelRequest>(`${this.apiUrl}/send/${senderId}`, request);
  }

  getRequestsBySender(senderId: number): Observable<ParcelRequest[]> {
    return this.http.get<ParcelRequest[]>(`${this.apiUrl}/sender/${senderId}`);
  }

  acceptRequest(requestId: number): Observable<ParcelRequest> {
    return this.http.put<ParcelRequest>(`${this.apiUrl}/accept/${requestId}`, {});
  }

  refuseRequest(requestId: number): Observable<ParcelRequest> {
    return this.http.put<ParcelRequest>(`${this.apiUrl}/refuse/${requestId}`, {});
  }
}
