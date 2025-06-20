import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParcelRequest } from '../models/parcel-request.model';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import {ParcelStatus} from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {
  private apiUrl = 'http://localhost:8081/api/parcels';

  constructor(private http: HttpClient, private userService: UserService) {}

  sendRequest(senderId: number, request: { tripId: number; dimensions: string; weight: number; type: string }): Observable<ParcelRequest> {
    return this.http.post<ParcelRequest>(`${this.apiUrl}/send/${senderId}`, request);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  getRequestsBySender(senderId: number): Observable<ParcelRequest[]> {
    // Step 1: Fetch raw data from the API
    return this.http.get<{ id: number; senderId: number; tripId: number; dimensions: string; weight: number; type: string; status: string; requestDate: string }[]>(`${this.apiUrl}/sender/${senderId}`).pipe(
      // Step 2: Map raw data to ParcelRequest with placeholder sender
      map(rawRequests =>
        rawRequests.map(raw => ({
          id: raw.id,
          sender: { id: raw.senderId } as User, // Placeholder User with id
          trip: { id: raw.tripId } as any,      // Placeholder Trip with id (to be handled separately if needed)
          dimensions: raw.dimensions,
          weight: raw.weight,
          type: raw.type,
          status: raw.status as ParcelStatus,
          requestDate: raw.requestDate
        }))
      ),
      // Step 3: Fetch full sender object
      switchMap(requests =>
        forkJoin(
          requests.map(request =>
            this.userService.getUserById(request.sender.id).pipe(
              map(user => ({ ...request, sender: user }))
            )
          )
        )
      )
    );
  }

  acceptRequest(requestId: number): Observable<ParcelRequest> {
    return this.http.put<ParcelRequest>(`${this.apiUrl}/accept/${requestId}`, {});
  }

  refuseRequest(requestId: number): Observable<ParcelRequest> {
    return this.http.put<ParcelRequest>(`${this.apiUrl}/refuse/${requestId}`, {});
  }
}
