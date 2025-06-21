import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripService } from '../../../services/trip.service';
import { AuthService } from '../../../services/auth.service';
import { Trip } from '../../../models/trip.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trip-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-post.component.html',
  styleUrl: './trip-post.component.css'
})
export class TripPostComponent {
  newTrip: Trip = {
    id: 0,
    driver: null,
    departure: '',
    destination: '',
    stopovers: [],
    maxDimensions: '',
    merchandiseType: '',
    availableCapacity: 0,
    departureDate: '',
    requests: []
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
    console.log('Submitting trip:', this.newTrip);
    console.log('Token:', this.authService.getToken());
    this.tripService.createTrip(this.newTrip).subscribe({
      next: (data) => {
        this.errorMessage = null;
        console.log('Trip created:', data);
        // Reset or redirect
      },
      error: (err) => {
        this.errorMessage = `Error posting trip: ${err.status === 403 ? 'Access denied' : err.message}`;
        console.error('Error posting trip:', err);
      }
    });
  }
}
