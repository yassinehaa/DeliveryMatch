import { Component, OnInit } from '@angular/core';
import { ParcelService } from '../../../services/parcel.service';
import { ParcelRequest } from '../../../models/parcel-request.model';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-trip-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-history.component.ts',
  styleUrl: './request-history.component.css'
})
export class TripRequestComponent implements OnInit {
  requests: ParcelRequest[] = [];
  errorMessage: string | null = null;

  constructor(private parcelService: ParcelService, private authService: AuthService) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.errorMessage = 'You must be logged in to view requests.';
      return;
    }
    this.loadRequests();
  }

  loadRequests() {
    const senderId = this.authService.getUser()?.userId; // Assuming AuthService provides user ID
    if (!senderId) {
      this.errorMessage = 'Sender ID not found. Please log in again.';
      return;
    }
    this.parcelService.getRequestsBySender(senderId).subscribe({
      next: (data: ParcelRequest[]) => {
        this.requests = data;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = `Failed to load requests: ${err.error?.error || err.message}`;
        console.error('Error fetching requests:', err);
      }
    });
  }

  acceptRequest(requestId: number) {
    this.parcelService.acceptRequest(requestId).subscribe({
      next: (updated: ParcelRequest) => {
        this.requests = this.requests.map(r => r.id === requestId ? updated : r);
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = `Failed to accept request: ${err.error?.error || err.message}`;
        console.error('Error accepting request:', err);
      }
    });
  }

  refuseRequest(requestId: number) {
    this.parcelService.refuseRequest(requestId).subscribe({
      next: (updated: ParcelRequest) => {
        this.requests = this.requests.map(r => r.id === requestId ? updated : r);
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = `Failed to refuse request: ${err.error?.error || err.message}`;
        console.error('Error refusing request:', err);
      }
    });
  }
}
