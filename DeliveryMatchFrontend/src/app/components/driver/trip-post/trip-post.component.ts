import { Component } from '@angular/core';
import {TripService} from '../../../services/trip.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-trip-post',
  imports: [
    FormsModule
  ],
  templateUrl: './trip-post.component.html',
  styleUrl: './trip-post.component.css'
})
export class TripPostComponent {
  newTrip = {
    departure: '',
    destination: '',
    stopovers: [''],
    maxDimensions: '',
    merchandiseType: '',
    availableCapacity: 0,
    departureDate: ''
  };
  driverId = 1; // Placeholder, replace with dynamic ID

  constructor(private tripService: TripService) {}

  onSubmit() {
    this.tripService.createTrip(this.driverId, this.newTrip).subscribe({
      next: () => console.log('Trip posted successfully'),
      error: (err) => console.error('Error posting trip', err)
    });
  }
}
