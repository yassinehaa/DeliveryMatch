import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../../services/trip.service';
import {NgForOf, NgIf} from '@angular/common';

interface CreateTripDTO {
  departure: string;
  destination: string;
  stopovers: string[];
  maxDimensions: string;
  merchandiseType: string;
  availableCapacity: number; // Maps to Double in backend
  departureDate: string; // Will be formatted to LocalDateTime
}

@Component({
  selector: 'app-trip-post',
  standalone: true,
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: './trip-post.component.html',
  styleUrl: './trip-post.component.css'
})
export class TripPostComponent {
  newTrip: CreateTripDTO = {
    departure: '',
    destination: '',
    stopovers: [''],
    maxDimensions: '',
    merchandiseType: '',
    availableCapacity: 0,
    departureDate: ''
  };
  driverId = 1; // Placeholder, replace with dynamic ID (e.g., from auth service)
  errorMessage: string | null = null;

  constructor(private tripService: TripService) {}

  onSubmit() {
    // Validate required fields
    if (!this.newTrip.departure || !this.newTrip.destination || !this.newTrip.departureDate) {
      this.errorMessage = 'Please fill in all required fields (departure, destination, departure date).';
      return;
    }

    // Clean stopovers
    this.newTrip.stopovers = this.newTrip.stopovers.filter(s => s.trim() !== '');

    // Format departureDate to LocalDateTime (e.g., "2025-06-20T00:00:00")
    const tripData = {
      ...this.newTrip,
      departureDate: this.newTrip.departureDate ? `${this.newTrip.departureDate}T00:00:00` : ''
    };

    console.log('Submitting trip:', tripData);
    this.tripService.createTrip(this.driverId, tripData).subscribe({
      next: (response) => {
        console.log('Trip posted successfully:', response);
        this.errorMessage = null;
        // Reset form
        this.newTrip = {
          departure: '',
          destination: '',
          stopovers: [''],
          maxDimensions: '',
          merchandiseType: '',
          availableCapacity: 0,
          departureDate: ''
        };
      },
      error: (err) => {
        this.errorMessage = `Error posting trip: ${err.error?.error || err.message}`;
        console.error('Error posting trip:', {
          status: err.status,
          statusText: err.statusText,
          message: err.message,
          error: err.error
        });
      }
    });
  }

  addStopover() {
    this.newTrip.stopovers.push('');
  }

  removeStopover(index: number) {
    if (this.newTrip.stopovers.length > 1) {
      this.newTrip.stopovers.splice(index, 1);
    }
  }
}
