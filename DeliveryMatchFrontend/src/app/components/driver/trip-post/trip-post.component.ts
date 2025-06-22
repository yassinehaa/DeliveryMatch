import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripService } from '../../../services/trip.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

interface CreateTripDTO {
  departure: string;
  destination: string;
  stopovers: string[];
  maxDimensions: string;
  merchandiseType: string;
  availableCapacity: number;
  departureDate: string; // Keep as string, format later
}

@Component({
  selector: 'app-trip-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-post.component.html',
  styleUrls: ['./trip-post.component.css']
})
export class TripPostComponent {
  newTrip: CreateTripDTO = {
    departure: '',
    destination: '',
    stopovers: [],
    maxDimensions: '',
    merchandiseType: '',
    availableCapacity: 0,
    departureDate: ''
  };

  errorMessage: string | null = null;

  constructor(private tripService: TripService, private authService: AuthService) {}

  addStopover() {
    this.newTrip.stopovers.push('');
  }

  removeStopover(index: number) {
    this.newTrip.stopovers.splice(index, 1);
  }

  onSubmit() {
    if (!this.authService.isLoggedIn()) {
      this.errorMessage = 'Please log in to create a trip.';
      return;
    }
    if (!this.authService.isDriver()) {
      this.errorMessage = 'Only drivers can create trips.';
      return;
    }
    this.newTrip.stopovers = this.newTrip.stopovers.filter(stop => stop.trim() !== '');
    console.log('Component: Submitting payload (raw):', JSON.stringify(this.newTrip, null, 2));

    // Format departureDate to ISO string with time
    const formattedTrip = {
      ...this.newTrip,
      departureDate: this.newTrip.departureDate + 'T12:00:00' // Default to noon, adjust as needed
    };
    console.log('Component: Submitting payload (formatted):', JSON.stringify(formattedTrip, null, 2));
    console.log('Component: Token used:', this.authService.getToken());
    this.tripService.createTrip(formattedTrip).subscribe({
      next: (data) => {
        this.errorMessage = null;
        console.log('Component: Trip created:', data);
      },
      error: (err) => {
        this.errorMessage = `Error posting trip: ${err.status === 403 ? 'Access denied' : err.message}`;
        console.error('Component: Error posting trip:', err);
      }
    });
  }
}
