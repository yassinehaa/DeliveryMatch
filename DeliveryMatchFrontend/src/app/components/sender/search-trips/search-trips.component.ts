import { Component } from '@angular/core';
import { Trip } from '../../../models/trip.model';
import { TripService } from '../../../services/trip.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-trips',
  standalone: true,
  imports: [NgIf, FormsModule, NgForOf],
  templateUrl: './search-trips.component.html',
  styleUrl: './search-trips.component.css'
})
export class SearchTripsComponent {
  trips: {
    id: number;
    departure: string;
    destination: string;
    stopovers: string[];
    maxDimensions: string;
    merchandiseType: string;
    availableCapacity: number;
    departureDate: string;
    driver: null;
    requests: any[]
  }[] = [];
  destination = '';

  constructor(private tripService: TripService) {}

  search() {
    this.tripService.searchTrips(this.destination).subscribe((data) => {
      this.trips = data;
    });
  }
}
