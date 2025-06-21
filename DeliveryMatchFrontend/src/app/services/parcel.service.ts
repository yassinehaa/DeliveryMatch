import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParcelRequest } from '../models/parcel-request.model';
import { Observable } from 'rxjs';
import { ParcelStatus } from '../models/role.model';

interface CreateParcelRequestDTO {
  destination: string;
  dimensions: string;
  merchandiseType: string;
}

@Injectable({
  providedIn: 'root'
})
export class ParcelService {
  private apiUrl = 'http://localhost:8081/api/parcels';

  constructor(private http: HttpClient) {}

  getRequestsBySender(senderId: number): Observable<ParcelRequest[]> {
    return this.http.get<ParcelRequest[]>(`${this.apiUrl}/sender/${senderId}`);
  }

  sendRequest(requestData: { senderId: number; dimensions: string; weight: number; type: string; status: ParcelStatus; requestDate: string }): Observable<any> {
    const payload = {
      ...requestData,
      status: requestData.status || ParcelStatus.EN_ATTENTE // Default to EN_ATTENTE
    };
    return this.http.post<any>(`${this.apiUrl}/send`, payload);
  }

  acceptRequest(requestId: number): Observable<ParcelRequest> {
    return this.http.put<ParcelRequest>(`${this.apiUrl}/accept/${requestId}`, {});
  }

  refuseRequest(requestId: number): Observable<ParcelRequest> {
    return this.http.put<ParcelRequest>(`${this.apiUrl}/refuse/${requestId}`, {});
  }
}
